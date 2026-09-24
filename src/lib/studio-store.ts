import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TEMPLATES, type TemplateId } from "@/lib/bedrock/templates";
import { newProject, upsertFile, validateProject } from "@/lib/bedrock/pack";
import type { ChatMessage, PackFile, Project, ValidationIssue } from "@/lib/bedrock/types";

export type MobileTab = "smith" | "files" | "editor" | "guide";

type StudioState = {
  projects: Project[];
  currentId: string | null;
  selectedPath: string | null;
  mobileTab: MobileTab;
  draftMessages: ChatMessage[];
  hydrated: boolean;
  setHydrated: () => void;
  current: () => Project | null;
  messages: () => ChatMessage[];
  issues: () => ValidationIssue[];
  setMobileTab: (tab: MobileTab) => void;
  selectPath: (path: string | null) => void;
  createPack: (input: { name: string; namespace: string; description: string }) => string;
  openPack: (id: string) => void;
  closePack: () => void;
  deletePack: (id: string) => void;
  applyFiles: (files: PackFile[]) => void;
  applyTemplate: (id: TemplateId) => void;
  writeFile: (path: string, content: string) => void;
  addFile: (path: string, content?: string) => void;
  removeFile: (path: string) => void;
  addMessage: (message: ChatMessage) => void;
  patchMessage: (id: string, patch: Partial<ChatMessage>) => void;
  renamePack: (input: { name: string; description: string }) => void;
};

function touch(project: Project): Project {
  return { ...project, updatedAt: Date.now() };
}

function withCurrent(
  state: Pick<StudioState, "projects" | "currentId">,
  fn: (project: Project) => Project,
): Partial<StudioState> {
  const id = state.currentId;
  if (!id) return {};
  return {
    projects: state.projects.map((p) => (p.id === id ? touch(fn(p)) : p)),
  };
}

export const useStudio = create<StudioState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentId: null,
      selectedPath: null,
      mobileTab: "smith",
      draftMessages: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      current: () => get().projects.find((p) => p.id === get().currentId) ?? null,
      messages: () => {
        const project = get().current();
        return project ? project.messages : get().draftMessages;
      },
      issues: () => {
        const project = get().current();
        return project ? validateProject(project) : [];
      },
      setMobileTab: (mobileTab) => set({ mobileTab }),
      selectPath: (selectedPath) => set({ selectedPath, mobileTab: "editor" }),
      createPack: (input) => {
        const drafts = get().draftMessages;
        const project = {
          ...newProject(input),
          messages: drafts,
        };
        set((s) => ({
          projects: [project, ...s.projects],
          currentId: project.id,
          selectedPath: "BP/manifest.json",
          draftMessages: [],
        }));
        return project.id;
      },
      openPack: (id) => {
        const project = get().projects.find((p) => p.id === id);
        set({
          currentId: id,
          selectedPath: project?.files[0]?.path ?? null,
          mobileTab: "files",
        });
      },
      closePack: () => set({ currentId: null, selectedPath: null, mobileTab: "smith" }),
      deletePack: (id) =>
        set((s) => {
          const projects = s.projects.filter((p) => p.id !== id);
          const currentId = s.currentId === id ? null : s.currentId;
          return { projects, currentId, selectedPath: currentId ? s.selectedPath : null };
        }),
      applyFiles: (files) =>
        set((s) =>
          withCurrent(s, (project) => {
            let next = project.files;
            for (const file of files) next = upsertFile(next, file);
            return { ...project, files: next };
          }),
        ),
      applyTemplate: (id) => {
        const template = TEMPLATES.find((t) => t.id === id);
        if (!template) return;
        if (!get().current()) {
          get().createPack({
            name: template.title,
            namespace: "packwright",
            description: template.blurb,
          });
        }
        const project = get().current();
        if (!project) return;
        const files = template.build(project.namespace);
        get().applyFiles(files);
        const firstJson = files.find(
          (f) => f.path.endsWith(".json") && !f.path.endsWith("manifest.json") && !f.path.includes("texture"),
        );
        set({ selectedPath: firstJson?.path ?? get().selectedPath, mobileTab: "editor" });
      },
      writeFile: (path, content) =>
        set((s) =>
          withCurrent(s, (project) => ({
            ...project,
            files: project.files.map((f) => (f.path === path ? { ...f, content } : f)),
          })),
        ),
      addFile: (path, content = "") =>
        set((s) => {
          const extra: Partial<StudioState> = { selectedPath: path, mobileTab: "editor" };
          return {
            ...extra,
            ...withCurrent(s, (project) => ({
              ...project,
              files: upsertFile(project.files, {
                path,
                content: content || (path.endsWith(".json") ? "{\n  \n}\n" : ""),
              }),
            })),
          };
        }),
      removeFile: (path) =>
        set((s) => {
          const nextSel = s.selectedPath === path ? null : s.selectedPath;
          return {
            selectedPath: nextSel,
            ...withCurrent(s, (project) => ({
              ...project,
              files: project.files.filter((f) => f.path !== path),
            })),
          };
        }),
      addMessage: (message) => {
        if (!get().currentId) {
          set((s) => ({ draftMessages: [...s.draftMessages, message].slice(-40) }));
          return;
        }
        set((s) =>
          withCurrent(s, (project) => ({
            ...project,
            messages: [...project.messages, message].slice(-40),
          })),
        );
      },
      patchMessage: (id, patch) => {
        if (!get().currentId) {
          set((s) => ({
            draftMessages: s.draftMessages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
          }));
          return;
        }
        set((s) =>
          withCurrent(s, (project) => ({
            ...project,
            messages: project.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
          })),
        );
      },
      renamePack: ({ name, description }) =>
        set((s) =>
          withCurrent(s, (project) => ({
            ...project,
            name: name.trim() || project.name,
            description: description.trim() || project.description,
          })),
        ),
    }),
    {
      name: "packwright-studio",
      skipHydration: true,
      partialize: (s) => ({
        projects: s.projects,
        draftMessages: s.draftMessages,
      }),
    },
  ),
);
