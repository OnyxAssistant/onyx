import { api } from "@/api";
import { NeuronPage as NeuronPageComponent } from "@/components/neurons/neuron-page";
import { Neuron } from "@/types/neuron";

export default async function NeuronPage({
  params,
}: {
  params: { path: string[] };
}) {
  try {
    const neurons = await api.get<Neuron[]>("/neurons");
    const neuron = neurons.find(
      (n: Neuron) => n.manifest.slug === params.path[0]
    );

    if (!neuron) {
      return <div>Neuron not found</div>;
    }

    const neuronPath = `/${params.path.slice(1).join("/")}` || "/";

    const page = neuron.manifest.pages.find((p) => p.path === neuronPath);

    if (!page) {
      return <div>Route not available</div>;
    }

    return <NeuronPageComponent neuron={neuron} path={neuronPath} />;
  } catch (error) {
    console.error("Error loading neuron:", error);
    return (
      <div>Error loading neuron. The neuron folder may have been deleted.</div>
    );
  }
}
