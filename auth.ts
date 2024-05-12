
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import NextAuth, { type DefaultSession } from "next-auth"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-token"

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER"
    } & DefaultSession["user"]
  }
}






export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow oauth sign in without email verification
      if (account?.provider !== "credentials") return true;

      //prevent sign in without email verification
      const existingUser = await getUserById(user.id!)
      if (!existingUser || !existingUser?.emailVerified) return false;

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id!);

        if (!twoFactorConfirmation) {
          return false
        }
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        })

      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token;

      token.role = existingUser.role
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER"
      }
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})