"use server"

import { registerSchema } from "@/schemas"
import { z } from "zod"

export const register = async (data: z.infer<typeof registerSchema>) => {

// server side validation
   const validatedData = registerSchema.safeParse(data)

   if(!validatedData.success){
   //  return validatedData.error
    return {error: "Invalid fields"}
}
    return {success: "Email sent"}
 
}