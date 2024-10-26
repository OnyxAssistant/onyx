import { AuthUser } from '@/api/auth/auth.d';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends AuthUser {}
}
