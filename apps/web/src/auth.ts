import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import MagicLinkEmail from "@/lib/emails/magic-link-email"
import { prisma } from "@onyx/db"
import { resend } from "@/lib/email"

export const authOptions: NextAuthOptions = {
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (user) => {
      const createdUser = await PrismaAdapter(prisma).createUser!(user)

      return createdUser
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            name: true,
            emailVerified: true,
          },
        });

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified ? "Sign-in link for Onyx" : "Activate your account";

        try {
          const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'delivered@resend.dev',
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: userVerified ? "login" : "register"
            }),
            // Set this to prevent Gmail from threading emails.
            // More info: https://resend.com/changelog/custom-email-headers
            headers: {
              'X-Entity-Ref-ID': new Date().getTime() + "",
            },
          });

          if (error || !data) {
            throw new Error(error?.message)
          }

          // console.log(data)
        } catch(err) {
          console.error(err)
          throw new Error("Failed to send verification email.")
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.type = token.type as string
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }

        return token
      }

      token.id = dbUser.id
      token.type = dbUser.type as string
      token.name = dbUser.name
      token.email = dbUser.email

      return token
    },
  },
}