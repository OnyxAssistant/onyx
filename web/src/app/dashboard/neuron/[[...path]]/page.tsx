import { api } from '@onyx/api'
import { NeuronPage as NeuronPageComponent } from '@/components/neurons/neuron-page'

interface Neuron {
    name: string;
    pages: {
      path: string;
      componentName: string;
    }[];
}

export default async function NeuronPage({ params }: { params: { path: string[] } }) {
  try {
    const neurons = await api.get<Neuron[]>("/get-neurons");
    const neuron = neurons.find((n: Neuron) => n.name === params.path[0]);

    if (!neuron) {
      return <div>Neuron not found</div>;
    }

    const neuronPath = `/${params.path.slice(1).join('/')}` || '/';

    const page = neuron.pages.find((p) => p.path === neuronPath);

    if (!page) {
      return <div>Route not available</div>;
    }

    return <NeuronPageComponent neuron={neuron} path={neuronPath} />;
  } catch (error) {
    console.error('Error loading neuron:', error);
    return <div>Error loading neuron. The neuron folder may have been deleted.</div>;
  }
}