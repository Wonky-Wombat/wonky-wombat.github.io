import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { identifyBreed } from "../../api/breed";
import { BreedApiError } from "../../api/breed";
import { useBreedScan } from "./useBreedScan";

type Identify = typeof identifyBreed;

const jpeg = () => new File([new Uint8Array(10)], "cat.jpg", { type: "image/jpeg" });
const catResult = {
  kind: "cat" as const,
  breed: "Maine Coon",
  furPattern: "tabby",
  probabilities: [{ label: "Maine Coon", probability: 0.82 }],
};

beforeEach(() => {
  let counter = 0;
  URL.createObjectURL = vi.fn(() => `blob:preview-${++counter}`);
  URL.revokeObjectURL = vi.fn();
});

describe("useBreedScan", () => {
  it("starts idle", () => {
    const { result } = renderHook(() => useBreedScan("https://gw.test", vi.fn<Identify>()));
    expect(result.current.state).toEqual({ status: "idle" });
  });

  it("goes scanning then done and keeps the preview", async () => {
    const identify = vi.fn<Identify>(async () => catResult);
    const { result } = renderHook(() => useBreedScan("https://gw.test", identify));

    act(() => result.current.scan(jpeg()));
    expect(result.current.state).toMatchObject({ status: "scanning", previewUrl: "blob:preview-1" });

    await waitFor(() => expect(result.current.state.status).toBe("done"));
    expect(result.current.state).toMatchObject({ previewUrl: "blob:preview-1", result: catResult });
    expect(identify.mock.calls[0]![1].baseUrl).toBe("https://gw.test");
  });

  it("rejects invalid files locally without calling the API", () => {
    const identify = vi.fn<Identify>();
    const { result } = renderHook(() => useBreedScan("https://gw.test", identify));

    act(() => result.current.scan(new File(["x"], "doc.pdf", { type: "application/pdf" })));

    expect(result.current.state).toEqual({ status: "error", previewUrl: null, error: { code: "unsupported_type" } });
    expect(identify).not.toHaveBeenCalled();
  });

  it("surfaces API errors with retry information", async () => {
    const identify = vi.fn<Identify>(async () => {
      throw new BreedApiError("rate_limited", "slow down", 30);
    });
    const { result } = renderHook(() => useBreedScan("https://gw.test", identify));

    act(() => result.current.scan(jpeg()));

    await waitFor(() => expect(result.current.state.status).toBe("error"));
    expect(result.current.state).toMatchObject({ error: { code: "rate_limited", retryAfterSeconds: 30 } });
  });

  it("maps unexpected failures to an unknown error", async () => {
    const identify = vi.fn<Identify>(async () => {
      throw new Error("boom");
    });
    const { result } = renderHook(() => useBreedScan("https://gw.test", identify));

    act(() => result.current.scan(jpeg()));

    await waitFor(() => expect(result.current.state).toMatchObject({ status: "error", error: { code: "unknown" } }));
  });

  it("ignores a stale response when a newer scan started", async () => {
    let resolveFirst: (value: Awaited<ReturnType<Identify>>) => void = () => {};
    const identify = vi
      .fn<Identify>()
      .mockImplementationOnce(() => new Promise((resolve) => (resolveFirst = resolve)))
      .mockImplementationOnce(async () => ({ kind: "no_cat" }));
    const { result } = renderHook(() => useBreedScan("https://gw.test", identify));

    act(() => result.current.scan(jpeg()));
    act(() => result.current.scan(jpeg()));
    await waitFor(() => expect(result.current.state).toMatchObject({ status: "done", result: { kind: "no_cat" } }));

    await act(async () => resolveFirst(catResult));
    expect(result.current.state).toMatchObject({ status: "done", result: { kind: "no_cat" } });
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview-1");
  });

  it("reset returns to idle and revokes the preview", async () => {
    const { result } = renderHook(() => useBreedScan("https://gw.test", vi.fn<Identify>(async () => catResult)));
    act(() => result.current.scan(jpeg()));
    await waitFor(() => expect(result.current.state.status).toBe("done"));

    act(() => result.current.reset());

    expect(result.current.state).toEqual({ status: "idle" });
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview-1");
  });

  it("aborts the request and revokes the preview on unmount", () => {
    let signal: AbortSignal | undefined;
    const identify = vi.fn<Identify>((_file, options) => {
      signal = options.signal;
      return new Promise(() => {});
    });
    const { result, unmount } = renderHook(() => useBreedScan("https://gw.test", identify));
    act(() => result.current.scan(jpeg()));

    unmount();

    expect(signal?.aborted).toBe(true);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview-1");
  });
});
