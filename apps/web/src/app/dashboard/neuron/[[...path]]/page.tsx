import { loadNeurons, Neuron } from '@onyx/core/utils/loadNeurons';
import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  try {
    const neurons = await loadNeurons();
    return neurons.flatMap((neuron) => 
      neuron.pages.map((page) => ({ 
        path: [neuron.name, ...page.path.split('/').filter(Boolean)]
      }))
    );
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function NeuronPage({ params }: { params: { path: string[] } }) {
  try {
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

    const DynamicNeuronComponent = dynamic(() => import(`@onyx/neurons/${neuron.name}/pages/${page.componentName}`), {
      loading: () => <p>Loading...</p>,
    });

    return <DynamicNeuronComponent />;
  } catch (error) {
    console.error('Error loading neuron:', error);
    return <div>Error loading neuron. The neuron folder may have been deleted.</div>;
  }
}
