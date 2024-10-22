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

export async function loadNeurons(): Promise<Neuron[]> {
  const neuronsDir = path.join(process.cwd(), '..', '..', 'packages', 'neurons');
  const neurons: Neuron[] = [];

  for (const neuronName of fs.readdirSync(neuronsDir)) {
    const neuronDir = path.join(neuronsDir, neuronName);
    const configPath = path.join(neuronDir, 'manifest.json');

    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const pages: { path: string, componentName: string }[] = [];
      const api: { 
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
      }[] = [];

      // Load pages
      if (config.pages && Array.isArray(config.pages)) {
        for (const page of config.pages) {
          if (page.name && page.path) {
            pages.push({ 
              path: page.path, 
              componentName: page.name
            });
          }
        }
      }
    
      // Load api
      if (config.api && Array.isArray(config.api)) {
        for (const apiConfig of config.api) {
          api.push({ 
            path: apiConfig.path, 
            name: apiConfig.name, 
            method: apiConfig.method, 
            handler: () => import(`@onyx/neurons/${neuronName}/api/${apiConfig.name}`)
              .then(handler => ({
                GET: handler.GET,
                POST: handler.POST,
                PATCH: handler.PATCH,
                PUT: handler.PUT,
                DELETE: handler.DELETE
              }))
              .catch(() => ({}))
          });
        }
      }

      const neuron: Neuron = {
        ...config,
        pages,
        api
      };
      neurons.push(neuron);
    }
  }

  return neurons;
}
