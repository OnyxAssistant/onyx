import { Neuron, loadNeurons } from './loadNeurons';

class NeuronManager {
  private neurons: Neuron[] = [];
  private initialized: boolean = false;

  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  private async initialize() {
    await this.reloadNeurons();
  }

  async getNeurons() {
    await this.ensureInitialized();
    return this.neurons;
  }

  async reloadNeurons() {
    this.neurons = await loadNeurons();
    this.initialized = true;
  }

  async getNeuronByName(name: string) {
    await this.ensureInitialized();
    return this.neurons.find(neuron => neuron.name === name);
  }
}

export const neuronManager = new NeuronManager();
