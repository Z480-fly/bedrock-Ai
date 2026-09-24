import { useRef, useState } from "react";
import { Hammer, LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { buildSmithProject } from "@/lib/bedrock/context";
import { STARTER_PROMPTS } from "@/lib/bedrock/knowledge";
import { stripSmithFences } from "@/lib/bedrock/parse";
import { streamSmith } from "@/lib/smith-client";
import { useStudio } from "@/lib/studio-store";
import type { ChatMessage, PackFile } from "@/lib/bedrock/types";
import { cn } from "@/lib/utils";

const EMPTY_MESSAGES: ChatMessage[] = [];

export function SmithChat({
  available,
  onNeedPack,
}: {
  available: boolean;
  onNeedPack: (files: PackFile[]) => void;
}) {
  const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
  const selectedPath = useStudio((s) => s.selectedPath);
  const messages = useStudio((s) => {
    if (!s.currentId) return s.draftMessages;
    return s.projects.find((p) => p.id === s.currentId)?.messages ?? EMPTY_MESSAGES;
  });
  const addMessage = useStudio((s) => s.addMessage);
  const patchMessage = useStudio((s) => s.patchMessage);
  const applyFiles = useStudio((s) => s.applyFiles);
  const selectPath = useStudio((s) => s.selectPath);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    if (!available) {
      toast.error("Smith is unavailable right now.");
      return;
    }
    setDraft("");
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: Date.now(),
    });
    const assistantId = crypto.randomUUID();
    addMessage({
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    });
    setBusy(true);
    try {
      const history = useStudio
        .getState()
        .messages()
        .filter((m) => m.id !== assistantId)
        .map((m) => ({ role: m.role, content: m.content }));
      const { text: full, files } = await streamSmith(
        {
          messages: history,
          project: buildSmithProject(useStudio.getState().current(), selectedPath),
        },
        (next) => {
          patchMessage(assistantId, { content: next });
          requestAnimationFrame(() => {
            scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
          });
        },
      );
      patchMessage(assistantId, { content: full, files: files.length ? files : undefined });
      if (files.length && project) {
        applyFiles(files);
        const first = files.find((f) => f.path.endsWith(".json"));
        if (first) selectPath(first.path);
        toast.success(`Applied ${files.length} file${files.length === 1 ? "" : "s"} to the pack.`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Smith failed.";
      patchMessage(assistantId, { content: message });
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Hammer className="size-4 text-accent" />
        <div>
          <p className="text-sm font-medium">Smith</p>
          <p className="text-xs text-muted">Bedrock-only. Refuses everything else.</p>
        </div>
      </div>

      <div ref={scroller} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted">
              Ask for a custom item, block, mob, recipe, loot table, Molang snippet,
              or a fix for a JSON file. Off-topic questions get a short no.
            </p>
            <div className="flex flex-col gap-2">
              {STARTER_PROMPTS.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={!available || busy}
                  onClick={() => send(prompt)}
                  className="rounded-lg bg-elevated px-3 py-2.5 text-left text-xs leading-relaxed text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <article key={message.id} className={cn("space-y-2", message.role === "user" && "ml-6")}>
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">
              {message.role === "user" ? "You" : "Smith"}
            </p>
            <div className="text-sm leading-relaxed whitespace-pre-wrap text-fg">
              {message.role === "assistant"
                ? stripSmithFences(message.content) || (busy ? "Forging…" : "")
                : message.content}
            </div>
            {message.files && message.files.length > 0 && (
              <div className="rounded-md bg-elevated p-3 shadow-[var(--shadow-border)]">
                <p className="text-xs text-muted">
                  {message.files.length} file{message.files.length === 1 ? "" : "s"}
                </p>
                <ul className="mt-1 space-y-0.5 font-mono text-xs text-fg">
                  {message.files.map((f) => (
                    <li key={f.path}>{f.path}</li>
                  ))}
                </ul>
                {project ? (
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      applyFiles(message.files!);
                      toast.success("Files applied.");
                    }}
                  >
                    Apply to pack
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => onNeedPack(message.files!)}
                  >
                    Create pack and apply
                  </Button>
                )}
              </div>
            )}
          </article>
        ))}
        {busy && (
          <p className="flex items-center gap-2 text-xs text-muted">
            <LoaderCircle className="size-3.5 animate-spin" />
            Smith is writing
          </p>
        )}
      </div>

      <form
        className="border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(draft);
        }}
      >
        <div className="flex items-end gap-2">
          <Textarea
            value={draft}
            disabled={!available || busy}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              available
                ? "Ask for a Bedrock addon, component, or a JSON fix…"
                : "Smith is unavailable in this environment."
            }
            rows={3}
            className="min-h-20 flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                void send(draft);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!available || busy || !draft.trim()}
            aria-label="Send"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-subtle">Ctrl/Cmd + Enter to send.</p>
      </form>
    </div>
  );
}
