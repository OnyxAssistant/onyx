import { redirect } from "next/navigation";
import { getProfile } from "@onyx/api/user";

import { DashboardHeader, DashboardShell } from "@onyx/ui";
import { ProfileForm } from "@/components/forms/profile-form";
import { UserProfile } from "@onyx/types/user";
import { constructMetadata } from "@onyx/utils/metadata";
import { getCurrentUser } from "@onyx/lib/session";

export const metadata = constructMetadata({
  title: "Profile",
  description: "Manage your profile",
});

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const user = await getProfile();

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
