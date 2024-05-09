"use server"

import { loginSchema } from "@/schemas"
import { z } from "zod"

export const login = async (data: z.infer<typeof loginSchema>) => {

// server side validation
   const validatedData = loginSchema.safeParse(data)

   if(!validatedData.success){
   //  return validatedData.error
    return {error: "Invalid fields"}
}
    return {success: "Email sent"}
 
}