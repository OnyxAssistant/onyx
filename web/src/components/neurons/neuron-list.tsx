'use client'
import { useRouter } from 'next/navigation'
import { Button, Loader, toast } from "@/components"
import { NeuronStore, Neuron } from '@/types/neuron'
import { installNeuronFromStore, uninstallNeuron } from '@/actions/neurons'
import { useState } from 'react'

export function NeuronList({ neurons, store }: { neurons: Neuron[], store: NeuronStore[] }) {
  const router = useRouter()
  const [loadingNeuron, setLoadingNeuron] = useState<string | null>(null)

  const handleUninstall = async (slug: string) => {
    setLoadingNeuron(slug)
    const res = await uninstallNeuron(slug)
    if (!res.success) {
      toast({
        title: "Error",
        description: res.error || "There was a problem uninstalling the neuron.",
        variant: "destructive",
      })
    } else {
      toast({
        description: "Neuron uninstalled.",
      })
    }
    setLoadingNeuron(null)
    router.refresh()
  }

  const handleInstall = async (slug: string) => {
    setLoadingNeuron(slug)
    const res = await installNeuronFromStore(slug)
    await new Promise(resolve => setTimeout(resolve, 5000));
    if (!res.success) {
      toast({
        title: "Error",
        description: res.error || "There was a problem installing the neuron.",
        variant: "destructive",
      })
    } else {
      toast({
        description: "Neuron successfully installed !",
      })
    }
    setLoadingNeuron(null)
    router.refresh()
  }

  const renderNeuronCard = (name: string, description: string, url: string, slug: string, isInstalled: boolean) => {
    return (
      <li key={name} className="border p-4 rounded-lg" >
        <h3 className="text-lg font-semibold hover:underline cursor-pointer" onClick={() => router.push(url)}>{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        {loadingNeuron === slug ? (
          <Loader size={40} />
        ) : isInstalled ? (
          <Button variant="destructive" onClick={() => handleUninstall(slug)}>Uninstall</Button>
        ) : (
          <Button onClick={() => handleInstall(slug)}>Install</Button>
        )}
      </li>
    )
  }

  // Filter out installed neurons from store
  const installedSlugs = neurons.map(n => n.manifest.slug)
  const availableStore = store.filter(s => !installedSlugs.includes(s.slug))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Installed Neurons</h2>
        <ul className="space-y-4">
          {neurons.map(neuron => renderNeuronCard(neuron.manifest.name, neuron.manifest.description, neuron.manifest.url, neuron.manifest.slug, true))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Neuron Store</h2>
        <ul className="space-y-4">
          {availableStore.map(neuron => renderNeuronCard(neuron.name, neuron.description, neuron.url, neuron.slug, false))}
        </ul>
      </div>
    </div>
  )
}