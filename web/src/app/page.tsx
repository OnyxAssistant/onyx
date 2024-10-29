import { redirect } from "next/navigation";
import Home from "@/components/home";
import { getCurrentUser } from "@/lib/session";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <Home />;
}
