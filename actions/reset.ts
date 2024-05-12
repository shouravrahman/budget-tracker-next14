"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetMail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { resetSchema } from "@/schemas"
import { z } from "zod"


export const reset = async (data: z.infer<typeof resetSchema>) => {

   // server side validation
   const validatedData = resetSchema.safeParse(data)

   if (!validatedData.success) {
      //  return validatedData.error
      return { error: "Invalid email" }
   }

   const { email } = validatedData.data;

   const existingUser = await getUserByEmail(email);

   if (!existingUser) {
      return { error: "Email does not exist" }
   }
   //gen token send email
   const token = await generatePasswordResetToken(email)
   await sendPasswordResetMail(email, token.token)


   return { success: "Email sent" }
}