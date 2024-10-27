import { CardSkeleton } from "@onyx/ui/components/shared/card-skeleton"
import { DashboardShell } from "@onyx/ui"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell heading="Profile" text="Manage your profile">
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
