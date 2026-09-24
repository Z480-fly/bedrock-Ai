import { createServerFn } from "@tanstack/react-start";

export const getSmithStatus = createServerFn({ method: "GET" }).handler(() => {
  return { available: Boolean(process.env.XAI_API_KEY) };
});
