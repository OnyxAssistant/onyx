import React from 'react';
import Link from 'next/link';
import { loadNeurons } from '@/utils/loadNeurons';

export default async function NeuronList() {
  const neurons = await loadNeurons();

  return (
    <ul>
      {neurons.map((neuron) => (
        <li key={neuron.name}>
          <Link href={`/neuron/${neuron.name}`}>
            {neuron.name} - {neuron.description}
          </Link>
        </li>
      ))}
    </ul>
  );
}
