import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "@/components/studio/studio";
import { getSmithStatus } from "@/lib/smith-status";

export const Route = createFileRoute("/")({
  loader: () => getSmithStatus(),
  component: Home,
});

function Home() {
  const { available } = Route.useLoaderData();
  return <Studio available={available} />;
}
