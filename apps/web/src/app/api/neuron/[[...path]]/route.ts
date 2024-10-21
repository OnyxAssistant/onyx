import { NextRequest, NextResponse } from 'next/server';
import { loadNeurons } from '@/utils/loadNeurons';

async function handleRequest(request: NextRequest, { params }: { params: { path: string[] } }) {
  const neurons = await loadNeurons();
  const neuronName = params.path[0];

  const neuron = neurons.find((n) => n.name === neuronName);

  if (!neuron) {
    return NextResponse.json({ message: 'Neuron not found' }, { status: 404 });
  }

  const apiPath = `/${params.path.slice(1).join('/')}` || '/';
  const apiHandler = neuron.api.find(api => api.path === apiPath);

  if (!apiHandler) {
    return NextResponse.json({ message: 'Neuron API not found' }, { status: 404 });
  }

  const method = request.method as keyof typeof apiHandler.handler;
  const handlerPromise = apiHandler.handler();

  try {
    const handlers = await handlerPromise;
    const handler = handlers[method];

    if (handler) {
      // @ts-expect-error - TODO: fix this
      return handler(request);
    } else {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error loading handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
