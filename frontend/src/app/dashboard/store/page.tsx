import { StoreForm } from '@/components/forms/store-form'
import { constructMetadata } from "@onyx/utils/metadata";
import { Card, CardHeader, CardTitle, CardContent, DashboardShell } from "@onyx/ui"

export const metadata = constructMetadata({
  title: "Neuron Store",
  description: "Install and manage neurons",
});

export default function StorePage() {
  return (
    <DashboardShell heading="Neuron Store" text="Install and manage neurons">
      <Card>
        <CardHeader>
          <CardTitle>Neuron Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Install from URL</h2>
              <StoreForm />
            </div>
            
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
