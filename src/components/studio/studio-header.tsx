import { useMemo } from "react";
import { BookOpen, Download, FileCode2, FolderTree, Hammer, Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportMcaddon } from "@/lib/bedrock/export";
import { validateProject } from "@/lib/bedrock/pack";
import { useStudio, type MobileTab } from "@/lib/studio-store";

export function StudioHeader({
  onNewPack,
  onHome,
}: {
  onNewPack: () => void;
  onHome: () => void;
}) {
  const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
  const issues = useMemo(() => (project ? validateProject(project) : []), [project]);
  const errorCount = issues.filter((i) => i.level === "error").length;

  async function onExport() {
    if (!project) {
      toast.error("Open a pack first.");
      return;
    }
    if (errorCount > 0) {
      toast.error("Fix JSON errors before export.");
      return;
    }
    try {
      await exportMcaddon(project);
      toast.success("Download started. Open the .mcaddon in Minecraft Bedrock.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed");
    }
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-bg/90 px-3 backdrop-blur-sm md:px-4">
      <button
        type="button"
        onClick={onHome}
        className="flex items-center gap-2.5 rounded-sm"
      >
        <span className="grid size-7 place-items-center rounded-sm bg-accent">
          <span className="block size-3 bg-accent-fg" />
        </span>
        <span className="font-display text-sm font-semibold tracking-tight">Packwright</span>
      </button>
      {project && (
        <>
          <span className="hidden text-subtle sm:inline">/</span>
          <p className="hidden min-w-0 truncate text-sm text-muted sm:block">{project.name}</p>
          {errorCount > 0 ? (
            <Badge tone="danger">{errorCount} error{errorCount === 1 ? "" : "s"}</Badge>
          ) : (
            <Badge tone="ok" className="hidden sm:inline-flex">
              Ready
            </Badge>
          )}
        </>
      )}
      <div className="ml-auto flex items-center gap-1.5">
        <Button size="sm" variant="ghost" onClick={onNewPack} className="hidden sm:inline-flex">
          <Plus className="size-4" />
          New
        </Button>
        <Button size="sm" variant="secondary" onClick={onExport} disabled={!project}>
          <Download className="size-4" />
          <span className="hidden sm:inline">Export .mcaddon</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>
    </header>
  );
}

export function MobileNav({ tab, onTab }: { tab: MobileTab; onTab: (tab: MobileTab) => void }) {
  const items: { id: MobileTab; label: string; icon: typeof Hammer }[] = [
    { id: "smith", label: "Smith", icon: Hammer },
    { id: "files", label: "Files", icon: FolderTree },
    { id: "editor", label: "Editor", icon: FileCode2 },
    { id: "guide", label: "Guide", icon: BookOpen },
  ];
  return (
    <nav className="flex h-14 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTab(item.id)}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs"
          >
            <Icon className={active ? "size-4 text-accent" : "size-4 text-muted"} />
            <span className={active ? "text-fg" : "text-muted"}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
