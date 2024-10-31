import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/api';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const apiPath = `/neuron/${params.path.join('/')}` || '/';
  const searchParams = request.nextUrl.searchParams;
  const response = await api.get(apiPath + '?' + searchParams.toString());
  return NextResponse.json(response);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const apiPath = `/neuron/${params.path.join('/')}` || '/';
  const searchParams = request.nextUrl.searchParams;
  const response = await api.post(apiPath + '?' + searchParams.toString(), await request.json());
  return NextResponse.json(response);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const apiPath = `/neuron/${params.path.join('/')}` || '/';
  const searchParams = request.nextUrl.searchParams;
  const response = await api.put(apiPath + '?' + searchParams.toString(), await request.json());
  return NextResponse.json(response);
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  const apiPath = `/neuron/${params.path.join('/')}` || '/';
  const searchParams = request.nextUrl.searchParams;
  const response = await api.patch(apiPath + '?' + searchParams.toString(), await request.json());
  return NextResponse.json(response);
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const apiPath = `/neuron/${params.path.join('/')}` || '/';
  const searchParams = request.nextUrl.searchParams;
  const response = await api.delete(apiPath + '?' + searchParams.toString());
  return NextResponse.json(response);
}