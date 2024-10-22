import { redirect } from "next/navigation";

import { DashboardHeader } from "@onyx/ui/components/dashboard/header";
import { DashboardShell } from "@onyx/ui/components/dashboard/shell";
import Dashboard from "@onyx/ui/components/dashboard/main";
import { getCurrentUser } from "@onyx/core/lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }


  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text=""></DashboardHeader>
      <div>
        <Dashboard currentUser={user} />
      </div>
    </DashboardShell>
  );
}
