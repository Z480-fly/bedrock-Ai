export type FileEncoding = "utf8" | "base64";

export type PackFile = {
  path: string;
  content: string;
  encoding?: FileEncoding;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  files?: PackFile[];
  createdAt: number;
};

export type Project = {
  id: string;
  name: string;
  namespace: string;
  description: string;
  files: PackFile[];
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export type ValidationIssue = {
  path: string;
  level: "error" | "warn";
  message: string;
};

export type SmithRequest = {
  messages: { role: ChatRole; content: string }[];
  project?: {
    name: string;
    namespace: string;
    description: string;
    selectedPath: string | null;
    fileIndex: string[];
    excerpts: { path: string; content: string }[];
  } | null;
};
