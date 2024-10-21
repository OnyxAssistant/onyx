'use server'

import { installNeuron as installNeuronCore, uninstallNeuron as uninstallNeuronCore } from '@onyx/core/actions/neurons'
import { neuronManager } from '@/utils/neuronManager'

export async function getInstalledNeurons() {
  const neurons = await neuronManager.getNeurons();
  return neurons.map(neuron => neuron.name);
}

export async function installNeuron(githubUrl: string) {
  await installNeuronCore(githubUrl);
  await neuronManager.reloadNeurons();
}

export async function uninstallNeuron(neuronName: string) {
  await uninstallNeuronCore(neuronName);
  await neuronManager.reloadNeurons();
}