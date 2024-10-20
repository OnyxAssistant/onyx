import { NextRequest, NextResponse } from 'next/server';
import { loadPlugins } from '@/utils/loadPlugins';

async function handleRequest(request: NextRequest, { params }: { params: { path: string[] } }) {
  const plugins = await loadPlugins();
  const pluginName = params.path[0];

  const plugin = plugins.find((p) => p.name === pluginName);

  if (!plugin) {
    return NextResponse.json({ message: 'Plugin not found' }, { status: 404 });
  }

  const apiPath = `/${params.path.slice(1).join('/')}` || '/';
  const apiHandler = plugin.api.find(api => api.path === apiPath);

  if (!apiHandler) {
    return NextResponse.json({ message: 'Plugin API not found' }, { status: 404 });
  }

  const method = request.method as keyof typeof apiHandler.handler;
  const handler = apiHandler.handler[method];

  if (handler) {
    return handler(request);
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, { params });
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, { params });
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, { params });
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, { params });
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, { params });
}
