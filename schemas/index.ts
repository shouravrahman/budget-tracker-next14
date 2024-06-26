import { z } from 'zod';

export const resetSchema = z.object({

   email: z.string().email({
      message: "Email is required"
   }),

})
export const newPasswordSchema = z.object({
   password: z.string().min(1, {
      message: "Password is required"
   }),
})
export const loginSchema = z.object({

   email: z.string().email({
      message: "Email is required"
   }),
   password: z.string().min(1, {
      message: "Password is required"
   }),
   code: z.optional(z.string())
})

export const registerSchema = z.object({

   email: z.string().email({
      message: "Email is required"
   }),
   password: z.string().min(6, {
      message: "Minimum 6 charecters required"
   }),
   name: z.string().min(1, {
      message: "Name is required"
   })
})