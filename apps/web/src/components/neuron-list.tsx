'use client'

import { useEffect, useState } from 'react'
import { getInstalledNeurons, uninstallNeuron } from '@/actions/neurons'
import { Button } from "@/components/ui/button"

export function NeuronList() {
  const [installedNeurons, setInstalledNeurons] = useState<string[]>([])

  useEffect(() => {
    fetchInstalledNeurons()
  }, [])

  const fetchInstalledNeurons = async () => {
    const neurons = await getInstalledNeurons()
    setInstalledNeurons(neurons)
  }

  const handleUninstall = async (neuronName: string) => {
    await uninstallNeuron(neuronName)
    fetchInstalledNeurons()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Installed Neurons</h2>
      <ul className="space-y-2">
        {installedNeurons.map(neuron => (
          <li key={neuron} className="flex items-center justify-between">
            <span>{neuron}</span>
            <Button variant="destructive" onClick={() => handleUninstall(neuron)}>Uninstall</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}