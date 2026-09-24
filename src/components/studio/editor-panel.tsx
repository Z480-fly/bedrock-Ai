import { useMemo, useState } from "react";
import { AlertTriangle, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fileKind } from "@/lib/bedrock/pack";
import { useStudio } from "@/lib/studio-store";

export function EditorPanel() {
  const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
  const selectedPath = useStudio((s) => s.selectedPath);
  const writeFile = useStudio((s) => s.writeFile);
  const file = project?.files.find((f) => f.path === selectedPath) ?? null;
  const [copied, setCopied] = useState(false);

  const jsonError = useMemo(() => {
    if (!file || fileKind(file.path) !== "json") return null;
    try {
      JSON.parse(file.content);
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : "Invalid JSON";
    }
  }, [file]);

  if (!project) {
    return (
      <Empty
        title="No pack on the bench"
        body="Create an addon or apply a starter kit. Smith can still answer Bedrock questions without a pack open."
      />
    );
  }

  if (!file) {
    return (
      <Empty
        title="Select a file"
        body="Open something from the tree. JSON, lang, functions, and textures all live here."
      />
    );
  }

  const kind = fileKind(file.path);
  const pngSrc =
    kind === "png"
      ? `data:image/png;base64,${file.content}`
      : null;

  function formatJson() {
    if (!file || kind !== "json") return;
    try {
      writeFile(file.path, JSON.stringify(JSON.parse(file.content), null, 2) + "\n");
      toast.success("Formatted JSON");
    } catch {
      toast.error("Cannot format invalid JSON");
    }
  }

  async function copy() {
    if (!file) return;
    await navigator.clipboard.writeText(file.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2.5">
        <p className="min-w-0 flex-1 truncate font-mono text-xs text-muted">{file.path}</p>
        {kind === "json" && (
          jsonError ? (
            <Badge tone="danger">Invalid JSON</Badge>
          ) : (
            <Badge tone="ok">Valid JSON</Badge>
          )
        )}
        {kind === "json" && (
          <Button size="sm" variant="ghost" onClick={formatJson}>
            Format
          </Button>
        )}
        {kind !== "png" && (
          <Button size="icon-sm" variant="ghost" onClick={copy} aria-label="Copy">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        )}
      </div>
      {pngSrc ? (
        <div className="flex min-h-0 flex-1 items-center justify-center p-6">
          <div className="rounded-lg bg-elevated p-4 shadow-[var(--shadow-border)]">
            <img
              src={pngSrc}
              alt={file.path}
              className="h-48 w-48 [image-rendering:pixelated]"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          {jsonError && (
            <p className="flex items-start gap-2 px-4 py-2 text-xs text-danger">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
              {jsonError}
            </p>
          )}
          <Textarea
            key={file.path}
            className="min-h-0 flex-1 resize-none rounded-none bg-transparent font-mono text-xs leading-relaxed shadow-none"
            value={file.content}
            spellCheck={false}
            onChange={(e) => writeFile(file.path, e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "s") {
                e.preventDefault();
                formatJson();
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full flex-col justify-center px-8 py-10">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
