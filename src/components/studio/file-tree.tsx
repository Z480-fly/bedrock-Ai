import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileJson,
  ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { basename, dirname, fileKind } from "@/lib/bedrock/pack";
import { TEMPLATES } from "@/lib/bedrock/templates";
import { useStudio } from "@/lib/studio-store";
import { cn } from "@/lib/utils";

type Node = {
  name: string;
  path: string;
  children?: Node[];
};

function nest(paths: string[]): Node[] {
  const folderMap = new Map<string, Node>();
  const roots: Node[] = [];

  const ensure = (path: string, isFile: boolean): Node => {
    const existing = folderMap.get(path);
    if (existing) return existing;
    const node: Node = isFile
      ? { name: basename(path), path }
      : { name: basename(path) || path, path, children: [] };
    folderMap.set(path, node);
    const parent = dirname(path);
    if (!parent) roots.push(node);
    else ensure(parent, false).children!.push(node);
    return node;
  };

  const folders = new Set<string>();
  for (const path of paths) {
    let parent = dirname(path);
    while (parent) {
      folders.add(parent);
      parent = dirname(parent);
    }
  }
  [...folders].sort().forEach((f) => ensure(f, false));
  paths.forEach((p) => ensure(p, true));
  const sortNodes = (nodes: Node[]) => {
    nodes.sort((a, b) => {
      const ad = a.children ? 0 : 1;
      const bd = b.children ? 0 : 1;
      if (ad !== bd) return ad - bd;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach((n) => n.children && sortNodes(n.children));
  };
  sortNodes(roots);
  return roots;
}

function FileGlyph({ path }: { path: string }) {
  const kind = fileKind(path);
  if (kind === "png") return <ImageIcon className="size-3.5 text-muted" />;
  if (kind === "json") return <FileJson className="size-3.5 text-muted" />;
  return <FileCode2 className="size-3.5 text-muted" />;
}

function TreeNode({ node }: { node: Node }) {
  const selectedPath = useStudio((s) => s.selectedPath);
  const selectPath = useStudio((s) => s.selectPath);
  const removeFile = useStudio((s) => s.removeFile);
  const [open, setOpen] = useState(true);
  const isDir = Boolean(node.children);

  if (isDir) {
    return (
      <div>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-1.5 rounded-sm px-2 text-left text-sm text-muted hover:bg-elevated hover:text-fg"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          <span className="truncate font-medium">{node.name}</span>
        </button>
        {open && (
          <div className="ml-3 border-l border-border">
            {node.children!.map((child) => (
              <TreeNode key={child.path} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const selected = selectedPath === node.path;
  return (
    <div className={cn("group flex h-9 items-center gap-1 pr-1", selected && "bg-elevated")}>
      <button
        type="button"
        className={cn(
          "flex min-w-0 flex-1 items-center gap-2 rounded-sm px-2 text-left text-sm",
          selected ? "text-fg" : "text-muted hover:text-fg",
        )}
        onClick={() => selectPath(node.path)}
      >
        <FileGlyph path={node.path} />
        <span className="truncate">{node.name}</span>
      </button>
      <button
        type="button"
        className="grid size-8 place-items-center rounded-sm text-subtle opacity-0 hover:bg-surface hover:text-danger group-hover:opacity-100"
        aria-label={`Delete ${node.name}`}
        onClick={() => removeFile(node.path)}
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

export function FileTree() {
  const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
  const addFile = useStudio((s) => s.addFile);
  const applyTemplate = useStudio((s) => s.applyTemplate);
  const [adding, setAdding] = useState(false);
  const [newPath, setNewPath] = useState("BP/items/");

  const tree = useMemo(
    () => nest(project?.files.map((f) => f.path) ?? []),
    [project?.files],
  );

  if (!project) {
    return (
      <div className="p-4 text-sm leading-relaxed text-muted">
        No pack open. Forge one, drop a starter kit, or ask Smith to write files
        and save them into a new addon.
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{project.name}</p>
          <p className="truncate font-mono text-xs text-muted">{project.namespace}:</p>
        </div>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Add file"
          onClick={() => setAdding((v) => !v)}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      {adding && (
        <form
          className="flex gap-2 px-3 pb-2"
          onSubmit={(e) => {
            e.preventDefault();
            const path = newPath.trim().replace(/^\/+/, "");
            if (!/^(BP|RP)\//.test(path) || path.includes("..")) return;
            addFile(path);
            setAdding(false);
          }}
        >
          <Input
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            className="h-9 font-mono text-xs"
            autoFocus
            spellCheck={false}
          />
        </form>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto px-1 pb-2">
        {tree.map((node) => (
          <TreeNode key={node.path} node={node} />
        ))}
      </div>
      <div className="border-t border-border px-3 py-3">
        <p className="mb-2 text-xs tracking-wide text-subtle uppercase">Kits</p>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATES.map((t) => (
            <Button key={t.id} size="sm" variant="secondary" onClick={() => applyTemplate(t.id)}>
              {t.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
