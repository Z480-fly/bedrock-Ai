import { Apple, BrickWall, Bug, Hammer, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEMPLATES, type TemplateId } from "@/lib/bedrock/templates";
import { useStudio } from "@/lib/studio-store";

const ICONS: Record<TemplateId, typeof Sword> = {
  sword: Sword,
  food: Apple,
  block: BrickWall,
  mob: Bug,
};

export function Welcome({
  onNewPack,
  onAskSmith,
}: {
  onNewPack: () => void;
  onAskSmith: () => void;
}) {
  const projects = useStudio((s) => s.projects);
  const openPack = useStudio((s) => s.openPack);
  const applyTemplate = useStudio((s) => s.applyTemplate);
  const deletePack = useStudio((s) => s.deletePack);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 py-10 md:py-16">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-md bg-accent text-accent-fg">
            <span className="block size-4 bg-accent-fg/90" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Packwright
          </span>
        </div>
        <p className="hidden text-xs tracking-wide text-muted uppercase sm:block">
          Bedrock only
        </p>
      </header>

      <section className="max-w-2xl space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
          Addon smith
        </p>
        <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
          An AI that only speaks{" "}
          <span className="text-accent">Bedrock.</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Smith forges behavior packs, resource packs, Molang, items, mobs, and
          the Script API. Java, Forge, and everything else are out of scope.
          Export a real <span className="font-mono text-fg">.mcaddon</span>.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={onNewPack}>
            New addon
          </Button>
          <Button size="lg" variant="secondary" onClick={onAskSmith}>
            <Hammer className="size-4" />
            Ask Smith
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
          Starter kits
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TEMPLATES.map((template) => {
            const Icon = ICONS[template.id];
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => applyTemplate(template.id)}
                className="rounded-xl bg-surface p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] hover:shadow-[var(--shadow-border-hover)]"
              >
                <Icon className="mb-4 size-5 text-accent" />
                <p className="font-display text-base font-semibold">{template.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{template.blurb}</p>
              </button>
            );
          })}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
            Recent packs
          </h2>
          <ul className="divide-y divide-border rounded-xl bg-surface shadow-[var(--shadow-border)]">
            {projects.map((project) => (
              <li key={project.id} className="flex items-center gap-3 px-4 py-3">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() => openPack(project.id)}
                >
                  <p className="truncate font-medium">{project.name}</p>
                  <p className="truncate font-mono text-xs text-muted">
                    {project.namespace}: · {project.files.length} files
                  </p>
                </button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => deletePack(project.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
