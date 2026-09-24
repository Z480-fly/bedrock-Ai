import type { PackFile, Project, ValidationIssue } from "./types";
import { dataUrlToBase64, makePackIcon } from "./pixels";

export const MIN_ENGINE: [number, number, number] = [1, 21, 0];

export function slugifyNamespace(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 24);
  return slug.length >= 2 ? slug : "packwright";
}

export function isValidNamespace(ns: string): boolean {
  return /^[a-z][a-z0-9_]{1,23}$/.test(ns);
}

export function isValidIdentifier(id: string): boolean {
  return /^[a-z][a-z0-9_]{1,23}:[a-z][a-z0-9_.]{0,62}$/.test(id);
}

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2) + "\n";
}

export function createBlankPack(input: {
  name: string;
  namespace: string;
  description: string;
}): PackFile[] {
  const bpHeader = crypto.randomUUID();
  const bpModule = crypto.randomUUID();
  const rpHeader = crypto.randomUUID();
  const rpModule = crypto.randomUUID();
  const icon = dataUrlToBase64(makePackIcon(input.namespace + input.name));

  const bpManifest = {
    format_version: 2,
    header: {
      name: input.name,
      description: input.description,
      uuid: bpHeader,
      version: [1, 0, 0],
      min_engine_version: MIN_ENGINE,
    },
    modules: [
      {
        type: "data",
        uuid: bpModule,
        version: [1, 0, 0],
      },
    ],
    dependencies: [{ uuid: rpHeader, version: [1, 0, 0] }],
    metadata: {
      authors: ["Packwright"],
      generated_with: { packwright: ["1.0.0"] },
    },
  };

  const rpManifest = {
    format_version: 2,
    header: {
      name: `${input.name} Resources`,
      description: `Textures and models for ${input.name}`,
      uuid: rpHeader,
      version: [1, 0, 0],
      min_engine_version: MIN_ENGINE,
    },
    modules: [
      {
        type: "resources",
        uuid: rpModule,
        version: [1, 0, 0],
      },
    ],
    metadata: {
      authors: ["Packwright"],
      generated_with: { packwright: ["1.0.0"] },
    },
  };

  const itemTexture = {
    resource_pack_name: input.namespace,
    texture_name: "atlas.items",
    texture_data: {} as Record<string, { textures: string }>,
  };

  const terrainTexture = {
    resource_pack_name: input.namespace,
    texture_name: "atlas.terrain",
    padding: 8,
    num_mip_levels: 4,
    texture_data: {} as Record<string, { textures: string }>,
  };

  const lang = [
    `pack.name=${input.name}`,
    `pack.description=${input.description}`,
    "",
  ].join("\n");

  return [
    { path: "BP/manifest.json", content: pretty(bpManifest) },
    { path: "BP/pack_icon.png", content: icon, encoding: "base64" },
    { path: "BP/texts/en_US.lang", content: lang },
    { path: "RP/manifest.json", content: pretty(rpManifest) },
    { path: "RP/pack_icon.png", content: icon, encoding: "base64" },
    { path: "RP/texts/en_US.lang", content: lang },
    { path: "RP/textures/item_texture.json", content: pretty(itemTexture) },
    { path: "RP/textures/terrain_texture.json", content: pretty(terrainTexture) },
  ];
}

export function upsertFile(files: PackFile[], next: PackFile): PackFile[] {
  const existing = files.find((f) => f.path === next.path);
  if (!existing) return [...files, next].sort((a, b) => a.path.localeCompare(b.path));
  if (shouldMerge(next.path)) {
    return files.map((f) =>
      f.path === next.path ? { ...f, content: mergeContents(f, next) } : f,
    );
  }
  return files.map((f) => (f.path === next.path ? { ...next, encoding: next.encoding ?? f.encoding } : f));
}

function shouldMerge(path: string): boolean {
  return (
    path.endsWith("item_texture.json") ||
    path.endsWith("terrain_texture.json") ||
    path.endsWith("en_US.lang")
  );
}

function mergeContents(prev: PackFile, next: PackFile): string {
  if (prev.path.endsWith(".lang") || next.path.endsWith(".lang")) {
    const lines = new Set(
      [...prev.content.split(/\r?\n/), ...next.content.split(/\r?\n/)]
        .map((l) => l.trimEnd())
        .filter((l) => l.length > 0),
    );
    return [...lines].join("\n") + "\n";
  }
  try {
    const a = JSON.parse(prev.content) as Record<string, unknown>;
    const b = JSON.parse(next.content) as Record<string, unknown>;
    const aData = (a.texture_data ?? {}) as Record<string, unknown>;
    const bData = (b.texture_data ?? {}) as Record<string, unknown>;
    return (
      JSON.stringify(
        { ...a, ...b, texture_data: { ...aData, ...bData } },
        null,
        2,
      ) + "\n"
    );
  } catch {
    return next.content;
  }
}

export function newProject(input: {
  name: string;
  namespace: string;
  description: string;
}): Project {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    name: input.name.trim() || "Untitled Pack",
    namespace: slugifyNamespace(input.namespace || input.name),
    description: input.description.trim() || "A Minecraft Bedrock addon forged in Packwright.",
    files: createBlankPack({
      name: input.name.trim() || "Untitled Pack",
      namespace: slugifyNamespace(input.namespace || input.name),
      description: input.description.trim() || "A Minecraft Bedrock addon forged in Packwright.",
    }),
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function validateProject(project: Project): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const paths = new Set(project.files.map((f) => f.path));
  if (!paths.has("BP/manifest.json")) {
    issues.push({ path: "BP/manifest.json", level: "error", message: "Behavior pack manifest is missing." });
  }
  if (!paths.has("RP/manifest.json")) {
    issues.push({ path: "RP/manifest.json", level: "error", message: "Resource pack manifest is missing." });
  }
  if (!isValidNamespace(project.namespace)) {
    issues.push({
      path: "project",
      level: "error",
      message: "Namespace must be lowercase, start with a letter, and use only a-z, 0-9, underscore.",
    });
  }
  for (const file of project.files) {
    if (file.encoding === "base64") continue;
    if (file.path.endsWith(".json")) {
      try {
        JSON.parse(file.content);
      } catch (err) {
        issues.push({
          path: file.path,
          level: "error",
          message: err instanceof Error ? err.message : "Invalid JSON",
        });
      }
    }
    if (file.path === "BP/manifest.json") {
      try {
        const manifest = JSON.parse(file.content) as {
          modules?: { type?: string }[];
          header?: { uuid?: string; min_engine_version?: unknown };
        };
        const type = manifest.modules?.[0]?.type;
        if (type && type !== "data" && type !== "script") {
          issues.push({
            path: file.path,
            level: "error",
            message: `Behavior pack module type should be "data" (found "${type}").`,
          });
        }
        if (!manifest.header?.uuid) {
          issues.push({ path: file.path, level: "error", message: "Header UUID is required." });
        }
      } catch {
        /* parse error already recorded */
      }
    }
    if (file.path === "RP/manifest.json") {
      try {
        const manifest = JSON.parse(file.content) as { modules?: { type?: string }[] };
        const type = manifest.modules?.[0]?.type;
        if (type && type !== "resources") {
          issues.push({
            path: file.path,
            level: "error",
            message: `Resource pack module type should be "resources" (found "${type}").`,
          });
        }
      } catch {
        /* parse error already recorded */
      }
    }
  }
  return issues;
}

export function fileKind(path: string): "json" | "lang" | "function" | "png" | "other" {
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".lang")) return "lang";
  if (path.endsWith(".mcfunction") || path.endsWith(".js") || path.endsWith(".ts")) return "function";
  if (path.endsWith(".png")) return "png";
  return "other";
}

export function dirname(path: string): string {
  const i = path.lastIndexOf("/");
  return i <= 0 ? "" : path.slice(0, i);
}

export function basename(path: string): string {
  const i = path.lastIndexOf("/");
  return i < 0 ? path : path.slice(i + 1);
}
