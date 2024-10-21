import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import Dashboard from "@/components/dashboard/main";
import { getCurrentUser } from "@/lib/session";

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
