import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BreedDemo from "./BreedDemo";

const jpeg = () => new File([new Uint8Array([0xff, 0xd8, 0xff, 1])], "cat.jpg", { type: "image/jpeg" });

function stubFetch(response: Response) {
  const fetchMock = vi.fn<typeof fetch>(async () => response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function renderDemo() {
  const user = userEvent.setup({ applyAccept: false });
  render(<BreedDemo gatewayUrl="https://gateway.test" />);
  const input = () => document.querySelector<HTMLInputElement>('input[type="file"]')!;
  return { user, input };
}

beforeEach(() => {
  URL.createObjectURL = vi.fn(() => "blob:preview");
  URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("BreedDemo", () => {
  it("invites the visitor to choose a photo and states the limits", () => {
    renderDemo();
    expect(screen.getByText("Choose a photo of your cat")).toBeInTheDocument();
    expect(screen.getByText(/JPG or PNG, up to 20 MB/)).toBeInTheDocument();
    expect(screen.getByText(/then discarded/)).toBeInTheDocument();
  });

  it("uploads the photo to the gateway and shows the breed breakdown", async () => {
    const fetchMock = stubFetch(
      Response.json({
        hasCat: true,
        detectCls: "cat",
        predictedLabel: "Maine Coon",
        topProbabilities: [
          { label: "Maine Coon", probability: 0.82 },
          { label: "Norwegian Forest", probability: 0.11 },
        ],
        predictedFurPattern: "tabby",
      }),
    );
    const { user, input } = renderDemo();

    await user.upload(input(), jpeg());

    expect(await screen.findByRole("heading", { name: "Maine Coon" })).toBeInTheDocument();
    expect(screen.getByText("tabby coat")).toBeInTheDocument();
    expect(screen.getByRole("meter", { name: "Maine Coon" })).toHaveAttribute("aria-valuenow", "82");
    expect(screen.getByAltText("Your cat's photo")).toHaveAttribute("src", "blob:preview");
    expect(fetchMock.mock.calls[0]![0]).toBe("https://gateway.test/api/breed");
  });

  it("tells the visitor when no cat was found", async () => {
    stubFetch(Response.json({ hasCat: false }));
    const { user, input } = renderDemo();

    await user.upload(input(), jpeg());

    expect(await screen.findByText(/couldn't spot a cat/)).toBeInTheDocument();
  });

  it("rejects unsupported files without calling the gateway", async () => {
    const fetchMock = stubFetch(Response.json({}));
    const { user, input } = renderDemo();

    await user.upload(input(), new File(["x"], "notes.pdf", { type: "application/pdf" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Only JPG and PNG photos are supported.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows a friendly message when rate limited", async () => {
    stubFetch(new Response("{}", { status: 429, headers: { "Retry-After": "30" } }));
    const { user, input } = renderDemo();

    await user.upload(input(), jpeg());

    expect(await screen.findByRole("alert")).toHaveTextContent("try again in 30 seconds");
  });

  it("lets the visitor scan another photo after a result", async () => {
    stubFetch(Response.json({ hasCat: false }));
    const { user, input } = renderDemo();
    await user.upload(input(), jpeg());
    await screen.findByText(/couldn't spot a cat/);

    await user.click(screen.getByRole("button", { name: "Scan another photo" }));

    await waitFor(() => expect(screen.getByText("Choose a photo of your cat")).toBeInTheDocument());
  });
});
