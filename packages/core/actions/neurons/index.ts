'use server'
import fs from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const NEURONS_DIR = path.join(process.cwd(), '..', '..', 'packages', 'neurons');

export async function getInstalledNeurons(): Promise<string[]> {
  try {
    const neurons = await fs.readdir(NEURONS_DIR)
    return neurons.filter(neuron => !neuron.startsWith('.'))
  } catch (error) {
    console.error('Error reading neurons directory:', error)
    return []
  }
}

export async function installNeuron(githubUrl: string): Promise<void> {
  const repoName = githubUrl.split('/').pop()?.replace('.git', '') || ''
  const neuronPath = path.join(NEURONS_DIR, repoName)

  try {
    await execAsync(`git clone ${githubUrl} ${neuronPath}`)
    console.log(`Neuron ${repoName} installed successfully`)
  } catch (error) {
    console.error(`Error installing neuron ${repoName}:`, error)
    throw new Error(`Failed to install neuron ${repoName}`)
  }
}

export async function uninstallNeuron(neuronName: string): Promise<void> {
  const neuronPath = path.join(NEURONS_DIR, neuronName)

  try {
    await fs.rm(neuronPath, { recursive: true, force: true })
    console.log(`Neuron ${neuronName} uninstalled successfully`)
  } catch (error) {
    console.error(`Error uninstalling neuron ${neuronName}:`, error)
    throw new Error(`Failed to uninstall neuron ${neuronName}`)
  }
}