"use client";

import { useState, type ChangeEvent, type DragEvent } from "react";
import SectionHead from "../../components/SectionHead";
import { ACCEPT_ATTRIBUTE, MAX_IMAGE_BYTES } from "../../lib/validateImage";
import "../../styles/scan.css";
import "./breed.css";
import { describeScanError } from "./messages";
import ProbabilityBars from "./ProbabilityBars";
import { useBreedScan } from "./useBreedScan";

const MAX_MB = MAX_IMAGE_BYTES / (1024 * 1024);

export default function BreedDemo({ gatewayUrl }: { gatewayUrl: string }) {
  const { state, scan, reset } = useBreedScan(gatewayUrl);
  const [dragging, setDragging] = useState(false);

  const busy = state.status === "scanning";
  const previewUrl = state.status === "idle" ? null : state.previewUrl;
  const result = state.status === "done" ? state.result : null;

  const onChoose = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) scan(file);
    event.target.value = ""; // allow choosing the same file again
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && !busy) scan(file);
  };

  return (
    <section id="breed" style={{ paddingTop: 0 }}>
      <SectionHead kicker="Bonus tool · free, right here" title="What breed is your cat, really?" />
      <div className="scan-card">
        <div className="scan-layout">
          {previewUrl ? (
            <img className="scan-preview" src={previewUrl} alt="Your cat's photo" />
          ) : (
            <label
              className={dragging ? "dropzone dragging" : "dropzone"}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
            >
              <input type="file" accept={ACCEPT_ATTRIBUTE} onChange={onChoose} />
              <strong>Choose a photo of your cat</strong>
              <span>or drag and drop it here</span>
              <small>JPG or PNG, up to {MAX_MB} MB</small>
            </label>
          )}

          <div className="scan-panel" aria-live="polite">
            {state.status === "idle" && (
              <p className="scan-reasoning">
                Upload a clear photo and we'll guess the closest breed match. No app, no account needed.
              </p>
            )}

            {state.status === "scanning" && (
              <div className="scan-status" role="status">
                <span className="scan-spinner" aria-hidden="true" />
                Reading the photo…
              </div>
            )}

            {result?.kind === "cat" && (
              <>
                <h3>{result.breed}</h3>
                {result.furPattern && <p className="scan-reasoning">{result.furPattern} coat</p>}
                {result.probabilities.length > 0 && <ProbabilityBars probabilities={result.probabilities} />}
              </>
            )}

            {result?.kind === "no_cat" && (
              <p className="scan-reasoning">
                We couldn't spot a cat in that photo. Try one where your cat's face is clearly visible.
              </p>
            )}

            {state.status === "error" && (
              <p className="scan-error" role="alert">
                {describeScanError(state.error)}
              </p>
            )}

            {(state.status === "done" || (state.status === "error" && previewUrl)) && (
              <button type="button" className="scan-button" onClick={reset}>
                Scan another photo
              </button>
            )}
          </div>
        </div>

        {state.status === "error" && !previewUrl && (
          <label className="scan-button" style={{ display: "inline-block", marginTop: 16 }}>
            <input type="file" accept={ACCEPT_ATTRIBUTE} onChange={onChoose} hidden />
            Choose another photo
          </label>
        )}

        <p className="scan-note">
          Sent securely to Catspace only to identify the breed, then discarded. It's a best guess based on the photo,
          not a DNA test, especially for mixed breeds.
        </p>
      </div>
    </section>
  );
}
