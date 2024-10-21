import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Dock from "@/components/layout/dock";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

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
    <div className="flex min-h-screen flex-col space-y-6 pt-12">
      <MaxWidthWrapper className="min-h-svh">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </MaxWidthWrapper>
      <Dock user={user} />
    </div>
  );
}
