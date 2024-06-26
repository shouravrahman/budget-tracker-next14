"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { GiConsoleController } from "react-icons/gi";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import {
    generateTwoFactorToken,
    generateVerificationToken,
} from "@/lib/tokens";
import { sendTwofactortokenEmail, sendVerificationMail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import db from "@/lib/db";

export const login = async (data: z.infer<typeof loginSchema>) => {
    // server side validation
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
        //  return validatedData.error
        return { error: "Invalid fields" };
    }
    const { email, password, code } = validatedData.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {
        return { error: "Email does not exist" };
    }
    if (!existingUser.emailVerified) {
        // create verification token
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationMail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation email sent" };
    }



    if (existingUser?.isTwoFactorEnabled && existingUser?.email) {

        if (code) {

            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken) {
                return { error: "Invalid code" };
            }
            if (twoFactorToken.token !== code) {
                return { error: "Invalid code" };
            }
            if (twoFactorToken.expires < new Date()) {
                return { error: "Code has expired" };

            }
            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })

        } else {

            const twoFactorToken = await generateTwoFactorToken(existingUser?.email);

            await sendTwofactortokenEmail(twoFactorToken?.email, twoFactorToken.token);

        }

    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};
