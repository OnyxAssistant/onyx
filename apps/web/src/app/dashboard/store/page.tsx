import { StoreForm } from '@onyx/ui/components/forms/store-form'
import { NeuronList } from '@onyx/ui/components/neurons/neuron-list'
import { constructMetadata } from "@onyx/core/utils/metadata";
import { Card, CardHeader, CardTitle, CardContent, DashboardShell, DashboardHeader } from "@onyx/ui"

export const metadata = constructMetadata({
  title: "Neuron Store",
  description: "Install and manage neurons",
});

export default function StorePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Neuron Store" text="Install and manage neurons"></DashboardHeader>
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
            <NeuronList />
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
