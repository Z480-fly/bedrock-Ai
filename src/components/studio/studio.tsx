import { useEffect, useState } from "react";
import { BookOpen, FileCode2 } from "lucide-react";
import { FileTree } from "@/components/studio/file-tree";
import { EditorPanel } from "@/components/studio/editor-panel";
import { GuidePanel } from "@/components/studio/guide-panel";
import { NewPackDialog } from "@/components/studio/new-pack-dialog";
import { SmithChat } from "@/components/studio/smith-chat";
import { MobileNav, StudioHeader } from "@/components/studio/studio-header";
import { Welcome } from "@/components/studio/welcome";
import { Button } from "@/components/ui/button";
import { slugifyNamespace } from "@/lib/bedrock/pack";
import { useStudio } from "@/lib/studio-store";
import type { PackFile } from "@/lib/bedrock/types";
import { cn } from "@/lib/utils";

export function Studio({ available }: { available: boolean }) {
  const currentId = useStudio((s) => s.currentId);
  const mobileTab = useStudio((s) => s.mobileTab);
  const setMobileTab = useStudio((s) => s.setMobileTab);
  const closePack = useStudio((s) => s.closePack);
  const createPack = useStudio((s) => s.createPack);
  const applyFiles = useStudio((s) => s.applyFiles);
  const setHydrated = useStudio((s) => s.setHydrated);
  const [newOpen, setNewOpen] = useState(false);
  const [center, setCenter] = useState<"editor" | "guide">("editor");
  const [pendingFiles, setPendingFiles] = useState<PackFile[] | null>(null);
  const [forceStudio, setForceStudio] = useState(false);

  useEffect(() => {
    void useStudio.persist.rehydrate().then(() => setHydrated());
  }, [setHydrated]);

  useEffect(() => {
    if (!pendingFiles || !currentId) return;
    applyFiles(pendingFiles);
    setPendingFiles(null);
  }, [pendingFiles, currentId, applyFiles]);

  const inStudio = Boolean(currentId) || forceStudio;

  function handleNeedPack(files: PackFile[]) {
    const hint =
      files
        .map((f) => f.path)
        .find((p) => p.includes("/"))
        ?.split("/")
        .at(-1)
        ?.replace(/\.[^.]+$/, "") ?? "smith_pack";
    setPendingFiles(files);
    createPack({
      name: hint.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      namespace: slugifyNamespace(hint),
      description: "Forged by Smith in Packwright.",
    });
    setForceStudio(true);
  }

  return (
    <div className={cn("flex flex-col bg-bg text-fg", inStudio ? "h-dvh overflow-hidden" : "min-h-dvh")}>
      <NewPackDialog open={newOpen} onOpenChange={setNewOpen} />
      {!inStudio ? (
        <div className="min-h-dvh overflow-y-auto">
          <Welcome
            onNewPack={() => setNewOpen(true)}
            onAskSmith={() => {
              setForceStudio(true);
              setMobileTab("smith");
            }}
          />
        </div>
      ) : (
        <>
          <StudioHeader
            onNewPack={() => setNewOpen(true)}
            onHome={() => {
              closePack();
              setForceStudio(false);
            }}
          />
          <div className="flex min-h-0 flex-1">
            <aside className="hidden w-64 shrink-0 overflow-hidden border-r border-border lg:block">
              <FileTree />
            </aside>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="hidden items-center gap-1 border-b border-border px-3 py-1.5 lg:flex">
                <Button
                  size="sm"
                  variant={center === "editor" ? "secondary" : "ghost"}
                  onClick={() => setCenter("editor")}
                >
                  <FileCode2 className="size-4" />
                  Editor
                </Button>
                <Button
                  size="sm"
                  variant={center === "guide" ? "secondary" : "ghost"}
                  onClick={() => setCenter("guide")}
                >
                  <BookOpen className="size-4" />
                  Guide
                </Button>
              </div>
              <div className="flex min-h-0 flex-1">
                <section
                  className={cn(
                    "min-h-0 min-w-0 flex-1 overflow-hidden",
                    mobileTab === "smith" && "hidden lg:block",
                  )}
                >
                  <div className="hidden h-full lg:block">
                    {center === "guide" ? <GuidePanel /> : <EditorPanel />}
                  </div>
                  <div className="h-full lg:hidden">
                    {mobileTab === "files" && <FileTree />}
                    {mobileTab === "editor" && <EditorPanel />}
                    {mobileTab === "guide" && <GuidePanel />}
                  </div>
                </section>
                <section
                  className={cn(
                    "min-h-0 overflow-hidden border-border",
                    mobileTab === "smith" ? "flex flex-1" : "hidden",
                    "lg:flex lg:w-[24rem] lg:flex-none lg:border-l xl:w-[26rem]",
                  )}
                >
                  <div className="h-full w-full">
                    <SmithChat available={available} onNeedPack={handleNeedPack} />
                  </div>
                </section>
              </div>
            </div>
          </div>
          <MobileNav tab={mobileTab} onTab={setMobileTab} />
        </>
      )}
    </div>
  );
}
