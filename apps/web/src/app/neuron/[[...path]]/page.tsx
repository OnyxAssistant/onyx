import { loadNeurons, Neuron } from '@/utils/loadNeurons';

export async function generateStaticParams() {
  const neurons = await loadNeurons();
  return neurons.flatMap((neuron) => 
    Object.keys(neuron.pages).map((pagePath) => ({ 
      name: neuron.name, 
      path: pagePath.split('/').filter(Boolean) 
    }))
  );
}

export default async function NeuronPage({ params }: { params: { path: string[] } }) {
  const neurons = await loadNeurons();
  const neuron = neurons.find((n: Neuron) => n.name === params.path[0]);

  if (!neuron) {
    return <div>Neuron not found</div>;
  }

  const neuronPath = `/${params.path.slice(1).join('/')}` || '/';

  const page = neuron.pages.find((p) => p.path === neuronPath);

  if (!page) {
    return <div>Route not available</div>;
  }

  const NeuronComponent = page.component;
  return <NeuronComponent />;
}
