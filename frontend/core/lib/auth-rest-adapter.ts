import axios from 'axios';
import { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from 'next-auth/adapters';

export function AuthRestAdapter(): Adapter {
  const client = axios.create({
    baseURL: `http://localhost:5000/auth`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || ''
    }
  });

  return {
    createUser: async (user: Omit<AdapterUser, 'id'>) => {
      const response = await client.post('/', user);
      return format<AdapterUser>(response.data);
    },
    getUserByEmail: async (email: string) => {
      const response = await client.get('/', { params: { email } });
      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    getUserByAccount: async ({
      providerAccountId,
      provider
    }: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) => {
      const response = await client.get(`/account/${provider}/${providerAccountId}`);
      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    getUser: async (id: string) => {
      const response = await client.get(`/${id}`);
      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    updateUser: async (user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>) => {
      const response = await client.patch('/', user);
      return format<AdapterUser>(response.data);
    },
    deleteUser: async (userId: string) => {
      const response = await client.delete(`/${userId}`);
      return response.data ? format<AdapterUser>(response.data) : response.data;
    },
    linkAccount: async (account: AdapterAccount) => {
      const response = await client.post('/account', account);
      return response.data ? format<AdapterAccount>(response.data) : response.data;
    },
    unlinkAccount: async ({ providerAccountId, provider }: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) => {
      const response = await client.delete(`/account/${provider}/${providerAccountId}`);
      return response.data ? format<AdapterAccount>(response.data) : response.data;
    },
    createSession: async (session: { sessionToken: string; userId: string; expires: Date }) => {
      const response = await client.post('/session', session);
      return response.data ? format<AdapterSession>(response.data) : response.data;
    },
    getSessionAndUser: async (sessionToken: string) => {
      const response = await client.get(`/session/${sessionToken}`);

      if (!response.data) {
        return response.data;
      }

      const session = format<AdapterSession>(response.data.session);
      const user = format<AdapterUser>(response.data.user);
      return { session, user };
    },
    updateSession: async (session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>) => {
      const response = await client.patch('/session', session);
      return response.data ? format<AdapterSession>(response.data) : response.data;
    },
    deleteSession: async (sessionToken: string) => {
      const response = await client.delete(`/session/${sessionToken}`);
      return response.data ? format<AdapterSession>(response.data) : response.data;
    },
    createVerificationToken: async (verificationToken: VerificationToken) => {
      const response = await client.post('/verification', verificationToken);
      return response.data ? format<VerificationToken>(response.data) : response.data;
    },
    useVerificationToken: async (params: { identifier: string; token: string }) => {
      const response = await client.patch(`/verification`, params);
      return response.data ? format<VerificationToken>(response.data) : response.data;
    }
  };
}

function format<T>(obj: Record<string, unknown>): T {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const newResult = result;

    if (value === null) {
      return newResult;
    }

    if (isDate(value)) {
      newResult[key] = new Date(value);
    } else {
      newResult[key] = value;
    }

    return newResult;
  }, {} as Record<string, unknown>) as T;
}

const isDate = (value: unknown): value is string =>
  typeof value === 'string' ? new Date(value).toString() !== 'Invalid Date' && !Number.isNaN(Date.parse(value)) : false;