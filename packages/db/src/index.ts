import { PrismaClient as CorePrismaClient } from '@onyx/db/prisma/generated/client';
import { getAllNeuronManifests } from '@onyx/core/utils/loadNeurons';

interface PrismaClients {
  [key: string]: any;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClients | undefined;
};

const initializePrismaClients = async (): Promise<PrismaClients> => {
  console.log('Initializing Prisma clients...');
  const clients: PrismaClients = {
    core: new CorePrismaClient(),
  };

  const neuronManifests = getAllNeuronManifests();

  for (const manifest of neuronManifests) {
   
      try {
        const { PrismaClient } = await import(`@onyx/neurons/${manifest.slug}/prisma/generated/client`);
        clients[manifest.slug] = new PrismaClient();
      } catch (error) {
        console.error(`Error loading Prisma client for ${manifest.slug}`);
      }

  }

  return clients;
};

export const prisma = globalForPrisma.prisma ?? await initializePrismaClients();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
