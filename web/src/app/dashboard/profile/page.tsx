import { redirect } from "next/navigation";
import { getProfile } from "@/api/user";

import { DashboardShell } from "@/components";
import { ProfileForm } from "@/components/forms/profile-form";
import { UserProfile } from "@/types/user";
import { constructMetadata } from "@/utils/metadata";
import { getCurrentUser } from "@/lib/session";

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
    <DashboardShell heading="Profile" text="Manage your profile">
      <div className="grid gap-10">
        <ProfileForm user={user as UserProfile} />
      </div>
    </DashboardShell>
  );
}
