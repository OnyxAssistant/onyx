import { redirect } from "next/navigation";
import { api } from "@/api";
import { Neuron } from "@/types/neuron";
import { getCurrentUser } from "@/lib/session";
import DashboardLayout from "@/components/dashboard/layout";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function Dashboard({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();
  const neurons = await api.get<Neuron[]>('/neurons');


  if (!user) {
    redirect("/login");
  }

  return <DashboardLayout user={user} neurons={neurons}>{children}</DashboardLayout>;
}
