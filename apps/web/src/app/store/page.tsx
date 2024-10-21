import { StoreForm } from '@/components/store-form'
import { NeuronList } from '@/components/neuron-list'

export default function StorePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Store de Neurons</h1>
      <StoreForm />
      <NeuronList />
    </div>
  )
}