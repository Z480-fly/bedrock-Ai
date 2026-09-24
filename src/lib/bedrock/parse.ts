import type { PackFile } from "./types";

const FENCE = /```packwright[ \t]+path=([^\n]+)\n([\s\S]*?)```/g;

export function parseSmithFiles(text: string): PackFile[] {
  const files: PackFile[] = [];
  const seen = new Set<string>();
  for (const match of text.matchAll(FENCE)) {
    const rawPath = (match[1] ?? "").trim().replace(/^\/+/, "");
    const body = (match[2] ?? "").replace(/\s+$/, "") + "\n";
    if (!rawPath || seen.has(rawPath)) continue;
    if (!/^(BP|RP)\//.test(rawPath)) continue;
    if (rawPath.includes("..") || rawPath.includes("\\")) continue;
    seen.add(rawPath);
    const encoding = rawPath.endsWith(".png") ? "base64" : "utf8";
    files.push({ path: rawPath, content: body, encoding });
  }
  return files;
}

export function stripSmithFences(text: string): string {
  return text.replace(FENCE, "").replace(/\n{3,}/g, "\n\n").trim();
}
