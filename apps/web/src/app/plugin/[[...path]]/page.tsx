import { loadPlugins, Plugin } from '@/utils/loadPlugins';

export async function generateStaticParams() {
  const plugins = await loadPlugins();
  return plugins.flatMap((plugin) => 
    Object.keys(plugin.pages).map((pagePath) => ({ 
      name: plugin.name, 
      path: pagePath.split('/').filter(Boolean) 
    }))
  );
}

export default async function PluginPage({ params }: { params: { path: string[] } }) {
  const plugins = await loadPlugins();
  const plugin = plugins.find((p: Plugin) => p.name === params.path[0]);

  if (!plugin) {
    return <div>Plugin not found</div>;
  }

  const pluginPath = `/${params.path.slice(1).join('/')}` || '/';

  const page = plugin.pages.find((p) => p.path === pluginPath);

  if (!page) {
    return <div>Route not available</div>;
  }

  const PluginComponent = page.component;
  return <PluginComponent />;
}
