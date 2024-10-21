import { redirect } from "next/navigation";
import { getUserById } from "@/lib/user";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { ProfileForm } from "@/components/forms/profile-form";
import { UserProfile } from "@/types/user";
import { getCurrentUser } from "@/lib/session";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const user = await getUserById(currentUser.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile"
      />
      <div className="grid gap-10">
        <ProfileForm user={user as UserProfile} />
      </div>
    </DashboardShell>
  );
}
