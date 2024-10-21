import { StoreForm } from '@/components/store-form'
import { NeuronList } from '@/components/neuron-list'

export default function StorePage() {

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Neuron Store</h1>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Install from URL</h2>
        <StoreForm />
      </div>
      <NeuronList />
    </div>
  )
}
