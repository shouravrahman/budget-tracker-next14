"use server"
import bcrypt from 'bcryptjs'
import { registerSchema } from "@/schemas"
import { z } from "zod"
import db from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (data: z.infer<typeof registerSchema>) => {

   // server side validation
   const validatedData = registerSchema.safeParse(data)

   if (!validatedData.success) {
      //  return validatedData.error
      return { error: "Invalid fields" }
   }

   const { email, password, name } = validatedData.data;
   const hashedPassword = await bcrypt.hash(password, 10)

   const existingUser = await getUserByEmail(email)

   if (existingUser) {
      return { error: "Email already in use" }
   }

   await db.user.create({
      data: {
         name, email, password: hashedPassword
      }
   })
   // todo send verification

   return { success: "User created" }

}