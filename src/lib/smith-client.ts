import { parseSmithFiles } from "@/lib/bedrock/parse";
import type { PackFile, SmithRequest } from "@/lib/bedrock/types";

export async function streamSmith(
  request: SmithRequest,
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<{ text: string; files: PackFile[] }> {
  const res = await fetch("/api/smith", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });

  if (!res.ok) {
    let message = `Smith returned ${res.status}`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!res.body || contentType.includes("application/json")) {
    const data = (await res.json()) as { text?: string; error?: string };
    if (data.error) throw new Error(data.error);
    const text = data.text ?? "";
    onDelta(text);
    return { text, files: parseSmithFiles(text) };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n");
    buffer = chunks.pop() ?? "";
    for (const line of chunks) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const json = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
        };
        const piece = json.choices?.[0]?.delta?.content ?? "";
        if (piece) {
          text += piece;
          onDelta(text);
        }
      } catch {
        /* incomplete json line */
      }
    }
  }

  return { text, files: parseSmithFiles(text) };
}
