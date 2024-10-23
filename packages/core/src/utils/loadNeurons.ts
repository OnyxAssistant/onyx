import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export interface Neuron {
  name: string;
  slug: string;
  version: string;
  description: string;
  pages: { path: string, componentName: string }[];
  api: { 
    path: string, 
    name: string, 
    method: string, 
    handler: () => Promise<{
      GET?: (request: NextRequest) => Promise<NextResponse>,
      POST?: (request: NextRequest) => Promise<NextResponse>,
      PATCH?: (request: NextRequest) => Promise<NextResponse>,
      PUT?: (request: NextRequest) => Promise<NextResponse>,
      DELETE?: (request: NextRequest) => Promise<NextResponse>
    }>
  }[];
}

export interface NeuronManifest {
  name: string;
  slug: string;
  version: string;
  description: string;
  pages?: { name: string, path: string }[];
  api?: { path: string, name: string, method: string }[];
}

function loadNeuronManifest(neuronDir: string): NeuronManifest | null {
  const configPath = path.join(neuronDir, 'manifest.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
  return null;
}

export function getAllNeuronManifests(): NeuronManifest[] {
  const neuronsDir = path.join(process.cwd(), '..', '..', 'packages', 'neurons');
  const manifests: NeuronManifest[] = [];

  for (const neuronName of fs.readdirSync(neuronsDir)) {
    const neuronDir = path.join(neuronsDir, neuronName);
    const manifest = loadNeuronManifest(neuronDir);
    if (manifest) {
      manifests.push(manifest);
    }
  }

  return manifests;
}

export async function loadNeurons(): Promise<Neuron[]> {
  const manifests = getAllNeuronManifests();
  const neurons: Neuron[] = [];

  for (const manifest of manifests) {
    const pages = manifest.pages?.map(page => ({
      path: page.path,
      componentName: page.name
    })) || [];

    const api = manifest.api?.map(apiConfig => ({
      path: apiConfig.path,
      name: apiConfig.name,
      method: apiConfig.method,
      handler: () => import(`@onyx/neurons/${manifest.slug}/api/${apiConfig.name}`)
        .then(handler => ({
          GET: handler.GET,
          POST: handler.POST,
          PATCH: handler.PATCH,
          PUT: handler.PUT,
          DELETE: handler.DELETE
        }))
        .catch(() => ({}))
    })) || [];

    const neuron: Neuron = {
      ...manifest,
      pages,
      api
    };
    neurons.push(neuron);
  }

  return neurons;
}
