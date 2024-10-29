import { CardSkeleton } from "@/components/shared/card-skeleton"
import { DashboardShell } from "@/components"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell heading="Profile" text="Manage your profile">
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
