import { redirect } from "next/navigation";

import { getCurrentUser } from "@onyx/lib/session";
import DashboardLayout from "@onyx/ui/components/dashboard/layout";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function Dashboard({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
