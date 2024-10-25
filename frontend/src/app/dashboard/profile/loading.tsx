import { CardSkeleton } from "@onyx/ui/components/shared/card-skeleton"
import { DashboardHeader } from "@onyx/ui/components/dashboard/header"
import { DashboardShell } from "@onyx/ui/components/dashboard/shell"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
