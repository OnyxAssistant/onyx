import { Card, CardHeader, CardTitle, CardContent, DashboardShell } from "@/components";
import Dashboard from "@/components/dashboard/main";
import { getCurrentUser } from "@/lib/session";


export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  return (
    <DashboardShell heading="Dashboard" text="Manage your dashboard">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Dashboard currentUser={currentUser} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
