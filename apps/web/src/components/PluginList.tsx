import React from 'react';
import Link from 'next/link';
import { loadPlugins } from '@/utils/loadPlugins';

export default async function PluginList() {
  const plugins = await loadPlugins();

  return (
    <ul>
      {plugins.map((plugin) => (
        <li key={plugin.name}>
          <Link href={`/plugin/${plugin.name}`}>
            {plugin.name} - {plugin.description}
          </Link>
        </li>
      ))}
    </ul>
  );
}
