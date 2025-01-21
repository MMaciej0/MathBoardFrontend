import { Button } from "@/components/ui/button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mathboard" },
    { name: "description", content: "Welcome to Mathboard!" },
  ];
}

export default function Home() {
  return (
    <div className="p-4 space-x-4">
      <Button>Primary button</Button>
      <Button variant="outline">Outline button</Button>
      <Button variant="ghost">Ghost button</Button>
    </div>
  );
}
