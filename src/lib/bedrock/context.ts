import { fileKind } from "./pack";
import type { Project, SmithRequest } from "./types";

const TEXT_LIMIT = 3500;
const EXCERPT_BUDGET = 14000;

export function buildSmithProject(project: Project | null, selectedPath: string | null): SmithRequest["project"] {
  if (!project) return null;
  const textFiles = project.files.filter(
    (f) => (f.encoding ?? "utf8") !== "base64" && fileKind(f.path) !== "png",
  );
  const preferred = new Set(
    [
      "BP/manifest.json",
      "RP/manifest.json",
      "BP/texts/en_US.lang",
      "RP/texts/en_US.lang",
      selectedPath,
    ].filter(Boolean) as string[],
  );
  const ordered = [
    ...textFiles.filter((f) => preferred.has(f.path)),
    ...textFiles.filter((f) => !preferred.has(f.path)),
  ];
  const excerpts: { path: string; content: string }[] = [];
  let used = 0;
  for (const file of ordered) {
    if (used >= EXCERPT_BUDGET) break;
    const slice = file.content.slice(0, TEXT_LIMIT);
    excerpts.push({ path: file.path, content: slice });
    used += slice.length;
  }
  return {
    name: project.name,
    namespace: project.namespace,
    description: project.description,
    selectedPath,
    fileIndex: project.files.map((f) => f.path),
    excerpts,
  };
}
