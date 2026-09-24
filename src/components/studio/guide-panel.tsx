import { useMemo, useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import {
  COMMON_FAILURES,
  COMPONENTS,
  FORMAT_VERSIONS,
  IDENTIFIER_RULES,
  INSTALL_STEPS,
  JAVA_VS_BEDROCK,
  MOLANG,
  PACK_STRUCTURE,
  SCRIPT_API,
} from "@/lib/bedrock/knowledge";

export function GuidePanel() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const components = useMemo(() => {
    if (!query) return COMPONENTS;
    return COMPONENTS.filter(
      (c) =>
        c.id.toLowerCase().includes(query) ||
        c.summary.toLowerCase().includes(query) ||
        c.kind.includes(query),
    );
  }, [query]);

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="space-y-8 px-5 py-5">
        <header className="space-y-2">
          <h2 className="font-display text-xl font-semibold">Bedrock bench notes</h2>
          <p className="text-sm leading-relaxed text-muted">
            Smith is trained on this same sheet. Search components, or read the
            pack rules before you export.
          </p>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search components, Molang, failures…"
          />
        </header>

        <Section title="Install an .mcaddon">
          <dl className="space-y-3">
            {INSTALL_STEPS.map((step) => (
              <div key={step.platform}>
                <dt className="text-sm font-medium">{step.platform}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{step.steps}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Pack folders">
          <div className="grid gap-4 md:grid-cols-2">
            {(["BP", "RP"] as const).map((side) => (
              <div key={side}>
                <p className="mb-2 font-mono text-xs text-accent">{side}/</p>
                <ul className="space-y-1 text-sm text-muted">
                  {PACK_STRUCTURE[side].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Identifiers">
          <ul className="space-y-1.5 text-sm text-muted">
            {IDENTIFIER_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Section>

        <Section title="Format versions (1.21 retail)">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs tracking-wide text-subtle uppercase">
                <tr>
                  <th className="py-1.5 pr-3 font-medium">Kind</th>
                  <th className="py-1.5 pr-3 font-medium">Version</th>
                  <th className="py-1.5 font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                {FORMAT_VERSIONS.map((row) => (
                  <tr key={row.kind} className="border-t border-border">
                    <td className="py-2 pr-3">{row.kind}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{row.version}</td>
                    <td className="py-2 text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Components">
          {components.length === 0 ? (
            <p className="text-sm text-muted">No components match.</p>
          ) : (
            <ul className="space-y-3">
              {components.map((c) => (
                <li key={c.id}>
                  <p className="font-mono text-xs text-accent">{c.kind}</p>
                  <p className="font-mono text-sm">{c.id}</p>
                  <p className="text-sm text-muted">{c.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Molang">
          <ul className="space-y-2">
            {MOLANG.map((m) => (
              <li key={m.expr}>
                <p className="font-mono text-sm">{m.expr}</p>
                <p className="text-sm text-muted">{m.meaning}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Script API">
          <ul className="space-y-2">
            {SCRIPT_API.map((s) => (
              <li key={s.module}>
                <p className="font-mono text-sm">
                  {s.module} {s.version}
                </p>
                <p className="text-sm text-muted">{s.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Java vs Bedrock">
          <ul className="space-y-2 text-sm">
            {JAVA_VS_BEDROCK.map((row) => (
              <li key={row.java}>
                <span className="text-muted">{row.java}</span>
                <span className="mx-2 text-subtle">→</span>
                <span>{row.bedrock}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Why packs fail to load">
          <ul className="space-y-1.5 text-sm text-muted">
            {COMMON_FAILURES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="font-display text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}
