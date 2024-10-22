import { redirect } from "next/navigation";
import { getUserById } from "@onyx/db/user";

import { DashboardHeader, DashboardShell } from "@onyx/ui";
import { ProfileForm } from "@onyx/ui/components/forms/profile-form";
import { UserProfile } from "@onyx/core/types/user";
import { constructMetadata } from "@onyx/core/utils/metadata";
import { getCurrentUser } from "@onyx/core/lib/session";

export const metadata = constructMetadata({
  title: "Profile",
  description: "Manage your profile",
});

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
