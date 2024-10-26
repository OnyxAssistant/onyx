import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github";
import MagicLinkEmail from "@onyx/lib/emails/magic-link-email"
import { resend } from "@onyx/lib/email"
import { AuthRestAdapter } from "@onyx/lib/auth-rest-adapter"

export const authOptions: NextAuthOptions = {
  adapter: AuthRestAdapter(),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const adapter = AuthRestAdapter();
        const user = await adapter?.getUserByEmail?.(identifier);

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified ? "Sign-in link for Onyx" : "Activate your account";

        try {
          const { data, error } = await resend?.emails.send({
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
          }) || {};
    
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
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
      const adapter = AuthRestAdapter();
      const dbUser = await adapter?.getUserByEmail?.(token.email as string);

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