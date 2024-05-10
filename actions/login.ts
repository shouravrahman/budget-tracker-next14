"use server"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { loginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import { GiConsoleController } from "react-icons/gi"
import { z } from "zod"

export const login = async (data: z.infer<typeof loginSchema>) => {

    // server side validation
    const validatedData = loginSchema.safeParse(data)

    if (!validatedData.success) {
        //  return validatedData.error
        return { error: "Invalid fields" }
    }
    const { email, password } = validatedData.data

    try {
        await signIn("credentials", {
            email, password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" }
                default:
                    return { error: "Something went wrong!" }
            }

        }
        throw error;
    }
}