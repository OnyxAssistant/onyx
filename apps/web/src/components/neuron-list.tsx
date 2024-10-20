'use client'
import { useEffect, useState } from 'react'
import { getInstalledNeurons, uninstallNeuron, installNeuron } from '@/actions/neurons'
import { Button } from "@/components/ui/button"
import { Neuron, loadAvailableNeurons } from '@onyx/core/actions/neurons'

export function NeuronList() {
  const [installedNeurons, setInstalledNeurons] = useState<string[]>([])
  const [availableNeurons, setAvailableNeurons] = useState<Neuron[]>([])

  useEffect(() => {
    const fetchNeurons = async () => {
      const neurons = await getInstalledNeurons()
      setInstalledNeurons(neurons)
      fetchAvailableNeurons(neurons)
    }
    fetchNeurons()
  }, [])

  const fetchInstalledNeurons = async () => {
    const neurons = await getInstalledNeurons()
    setInstalledNeurons(neurons)
    fetchAvailableNeurons(neurons)
  }

  const fetchAvailableNeurons = async (installed: string[]) => {
    const neurons = await loadAvailableNeurons()
    const filteredNeurons = neurons.filter(neuron => !installed.includes(neuron.slug))
    setAvailableNeurons(filteredNeurons)
  }

  const handleUninstall = async (neuronName: string) => {
    await uninstallNeuron(neuronName)
    fetchInstalledNeurons()
  }

  const handleInstall = async (url: string) => {
    await installNeuron(url)
    fetchInstalledNeurons()
  }

  const renderNeuronCard = (neuron: Neuron | string, isInstalled: boolean) => {
    const name = typeof neuron === 'string' ? neuron : neuron.name
    const description = typeof neuron === 'string' ? '' : neuron.description
    const url = typeof neuron === 'string' ? '' : neuron.url

    return (
      <li key={name} className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        {isInstalled ? (
          <Button variant="destructive" onClick={() => handleUninstall(name)}>Uninstall</Button>
        ) : (
          <Button onClick={() => handleInstall(url)}>Install</Button>
        )}
      </li>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Installed Neurons</h2>
        <ul className="space-y-4">
          {installedNeurons.map(neuron => renderNeuronCard(
            availableNeurons.find(n => n.name === neuron) || neuron,
            true
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Neurons</h2>
        <ul className="space-y-4">
          {availableNeurons.map(neuron => renderNeuronCard(neuron, false))}
        </ul>
      </div>
    </div>
  )
}
