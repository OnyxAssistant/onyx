import { Injectable } from '@nestjs/common';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from 'next-auth/adapters';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
  adapter: Adapter;

  constructor(prisma: PrismaService) {
    this.adapter = PrismaAdapter(prisma);
  }

  async createUser(user: Omit<AdapterUser, 'id'>) {
    return await this.adapter.createUser(user);
  }

  async getUserByEmail(email: string) {
    return await this.adapter.getUserByEmail(email);
  }

  async getUserByAccount(id: string, provider: string) {
    return await this.adapter.getUserByAccount({ providerAccountId: id, provider });
  }

  async getUser(id: string) {
    return await this.adapter.getUser(id);
  }

  async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>) {
    return await this.adapter.updateUser(user);
  }

  async deleteUser(userId: string) {
    return await this.adapter.deleteUser?.(userId);
  }

  async linkAccount(account: AdapterAccount) {
    return await this.adapter.linkAccount(account);
  }

  async unlinkAccount(id: string, provider: string) {
    return await this.adapter.unlinkAccount?.({ providerAccountId: id, provider });
  }

  async createSession(session: { sessionToken: string; userId: string; expires: Date }) {
    return await this.adapter.createSession(session);
  }

  async getSessionAndUser(sessionToken: string) {
    return await this.adapter.getSessionAndUser(sessionToken);
  }

  async updateSession(session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>) {
    return await this.adapter.updateSession(session);
  }

  async deleteSession(sessionToken: string) {
    return await this.adapter.deleteSession(sessionToken);
  }

  async createVerificationToken(verificationToken: VerificationToken) {
    return await this.adapter.createVerificationToken?.(verificationToken);
  }

  async useVerificationToken({ identifier, token }) {
    return await this.adapter.useVerificationToken?.({ identifier, token });
  }
}
