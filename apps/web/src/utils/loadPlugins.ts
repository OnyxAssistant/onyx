import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

export interface Plugin {
  name: string;
  version: string;
  description: string;
  pages: { path: string, component: ComponentType }[];
  api: { 
    path: string, 
    name: string, 
    method: string, 
    handler: {
      GET?: (request: NextRequest) => Promise<NextResponse>,
      POST?: (request: NextRequest) => Promise<NextResponse>,
      PATCH?: (request: NextRequest) => Promise<NextResponse>,
      PUT?: (request: NextRequest) => Promise<NextResponse>,
      DELETE?: (request: NextRequest) => Promise<NextResponse>
    } 
  }[];
}

export async function loadPlugins(): Promise<Plugin[]> {
  const pluginsDir = path.join(process.cwd(), '..', '..', 'packages', 'plugins');
  const plugins: Plugin[] = [];

  for (const pluginName of fs.readdirSync(pluginsDir)) {
    const pluginDir = path.join(pluginsDir, pluginName);
    const configPath = path.join(pluginDir, 'plugin.json');

    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const pages: { path: string, component: ComponentType }[] = [];
      const api: { 
        path: string, 
        name: string, 
        method: string, 
        handler: {
          GET?: (request: NextRequest) => Promise<NextResponse>,
          POST?: (request: NextRequest) => Promise<NextResponse>,
          PATCH?: (request: NextRequest) => Promise<NextResponse>,
          PUT?: (request: NextRequest) => Promise<NextResponse>,
          DELETE?: (request: NextRequest) => Promise<NextResponse>
        } 
      }[] = [];

      // Load pages
      if (config.pages && Array.isArray(config.pages)) {
        for (const page of config.pages) {
          if (page.name && page.path) {
            const pagePath = path.join('pages', page.name);
            pages.push({ path: page.path, component: dynamic(() => import(`@onyx/plugins/${pluginName}/${pagePath}`)) });
          }
        }
      }

      // Load api
      if (config.api && Array.isArray(config.api)) {
        for (const apiConfig of config.api) {
          const handler = await import(`@onyx/plugins/${pluginName}/api/${apiConfig.name}`);
          api.push({ 
            path: apiConfig.path, 
            name: apiConfig.name, 
            method: apiConfig.method, 
            handler: {
              GET: handler.GET,
              POST: handler.POST,
              PATCH: handler.PATCH,
              PUT: handler.PUT,
              DELETE: handler.DELETE
            }
          });
        }
      }

      const plugin: Plugin = {
        ...config,
        pages,
        api
      };
      plugins.push(plugin);
    }
  }

  return plugins;
}
