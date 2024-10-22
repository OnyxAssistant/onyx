import { redirect } from "next/navigation";
import { getUserById } from "@onyx/core/lib/user";

import { DashboardHeader } from "@onyx/ui/components/dashboard/header";
import { DashboardShell } from "@onyx/ui/components/dashboard/shell";
import { ProfileForm } from "@onyx/ui/components/forms/profile-form";
import { UserProfile } from "@onyx/core/types/user";
import { getCurrentUser } from "@onyx/core/lib/session";

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
