import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, DashboardHeader, DashboardShell } from "@onyx/ui";
import Dashboard from "@onyx/ui/components/dashboard/main";
import { constructMetadata } from "@onyx/core/utils/metadata";
import { getCurrentUser } from "@onyx/core/lib/session";

export const metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your dashboard",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }


  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your dashboard"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Dashboard currentUser={user} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
