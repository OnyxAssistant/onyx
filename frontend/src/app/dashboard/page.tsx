import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, DashboardShell } from "@onyx/ui";
import Dashboard from "@/components/dashboard/main";
import { constructMetadata } from "@onyx/utils/metadata";
import { getCurrentUser } from "@onyx/lib/session";

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
    <DashboardShell heading="Dashboard" text="Manage your dashboard">
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
