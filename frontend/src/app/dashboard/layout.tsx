import { redirect } from "next/navigation";

import { getCurrentUser } from "@onyx/lib/session";
import {
  SidebarProvider,
} from "@onyx/ui/components/ui/sidebar";
import { OnyxSidebar } from "@onyx/ui/components/layout/sidebar";
import Dock from "@onyx/ui/components/layout/dock";
import MaxWidthWrapper from "@onyx/ui/components/shared/max-width-wrapper";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6 pt-6">
      <MaxWidthWrapper className="min-h-svh" large>
        <SidebarProvider>
          <OnyxSidebar user={user} />
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
          <Dock/>
        </SidebarProvider>
       
      </MaxWidthWrapper>
    </div>
  );
}
