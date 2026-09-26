import { useCallback, useEffect, useRef, useState } from "react";
import { BreedApiError, identifyBreed, type BreedResult } from "../../api/breed";
import { validateImage, type ImageProblem } from "../../lib/validateImage";

export type ScanError =
  | { code: ImageProblem | BreedApiError["code"]; retryAfterSeconds?: number }
  | { code: "unknown" };

export type ScanState =
  | { status: "idle" }
  | { status: "scanning"; previewUrl: string }
  | { status: "done"; previewUrl: string; result: BreedResult }
  | { status: "error"; previewUrl: string | null; error: ScanError };

export interface UseBreedScan {
  state: ScanState;
  scan: (file: File) => void;
  reset: () => void;
}

export function useBreedScan(baseUrl: string, identify: typeof identifyBreed = identifyBreed): UseBreedScan {
  const [state, setState] = useState<ScanState>({ status: "idle" });
  const controller = useRef<AbortController | null>(null);
  const previewUrl = useRef<string | null>(null);

  const releasePreview = useCallback(() => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = null;
  }, []);

  const cancelInFlight = useCallback(() => {
    controller.current?.abort();
    controller.current = null;
  }, []);

  const scan = useCallback(
    (file: File) => {
      cancelInFlight();
      releasePreview();

      const problem = validateImage(file);
      if (problem) {
        setState({ status: "error", previewUrl: null, error: { code: problem } });
        return;
      }

      const url = URL.createObjectURL(file);
      previewUrl.current = url;
      const request = new AbortController();
      controller.current = request;
      setState({ status: "scanning", previewUrl: url });

      identify(file, { baseUrl, signal: request.signal }).then(
        (result) => {
          if (request.signal.aborted) return;
          setState({ status: "done", previewUrl: url, result });
        },
        (error: unknown) => {
          if (request.signal.aborted) return;
          const scanError: ScanError =
            error instanceof BreedApiError
              ? { code: error.code, retryAfterSeconds: error.retryAfterSeconds }
              : { code: "unknown" };
          setState({ status: "error", previewUrl: url, error: scanError });
        },
      );
    },
    [identify, baseUrl, cancelInFlight, releasePreview],
  );

  const reset = useCallback(() => {
    cancelInFlight();
    releasePreview();
    setState({ status: "idle" });
  }, [cancelInFlight, releasePreview]);

  useEffect(
    () => () => {
      cancelInFlight();
      releasePreview();
    },
    [cancelInFlight, releasePreview],
  );

  return { state, scan, reset };
}
