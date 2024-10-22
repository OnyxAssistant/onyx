import { redirect } from "next/navigation";

import { getCurrentUser } from "@onyx/core/lib/session";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <p>Home</p>
    </div>
  );
}
