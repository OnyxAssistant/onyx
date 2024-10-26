import { User } from "next-auth"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    type: string
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      type: string
    }
  }

  interface User extends DefaultUser {
    type?: string;
  }
}
