import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mathboard" },
    { name: "description", content: "Welcome to Mathboard!" },
  ];
}

export default function Home() {
  return <div>Mathboard</div>;
}
