import JSZip from "jszip";
import type { Project } from "./types";
import { slugifyNamespace } from "./pack";

function folderName(project: Project, kind: "BP" | "RP"): string {
  const base = slugifyNamespace(project.name);
  return `${base}_${kind}`;
}

export async function exportMcaddon(project: Project): Promise<void> {
  const zip = new JSZip();
  const bpRoot = folderName(project, "BP");
  const rpRoot = folderName(project, "RP");

  for (const file of project.files) {
    const mapped = file.path.startsWith("BP/")
      ? `${bpRoot}/${file.path.slice(3)}`
      : file.path.startsWith("RP/")
        ? `${rpRoot}/${file.path.slice(3)}`
        : file.path;
    if (file.encoding === "base64") {
      zip.file(mapped, file.content, { base64: true });
    } else {
      zip.file(mapped, file.content);
    }
  }

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugifyNamespace(project.name)}.mcaddon`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
