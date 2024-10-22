import { redirect } from "next/navigation";
import Home from "@onyx/ui/components/home";
import { getCurrentUser } from "@onyx/core/lib/session";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <Home />;
}
