import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schemas"
import { getUserByEmail } from "./data/user";
import bcrypt from 'bcryptjs';
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";


export default {
   providers: [
      Credentials({
         async authorize(credentials) {
            console.log(credentials)
            const validatedFields = loginSchema.safeParse(credentials);
            if (validatedFields.success) {
               const { email, password } = validatedFields.data;

               const user = await getUserByEmail(email)
               console.log(user)
               if (!user || !user.password) {
                  return null
               }

               const passwordsMatch = await bcrypt.compare(password, user.password)

               if (passwordsMatch) {
                  console.log(user)

                  return user
               }

            }
            return null
         }
      }),
      Github({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET
      }),
      Google({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET
      })

   ],
} satisfies NextAuthConfig