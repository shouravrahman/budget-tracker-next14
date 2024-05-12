import { getVerificationTokenByEmail } from "@/data/verification-token";
import { randomBytes, randomUUID } from "crypto";
import db from "./db";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
   const token = randomUUID();
   const expires = new Date(Date.now() + 60 * 60 * 1000);
   const existingToken = await getVerificationTokenByEmail(email);

   if (existingToken) {
      await db.verificationToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }

   const verificationToken = await db.verificationToken.create({
      data: {
         email,
         token,
         expires
      }
   })
   return verificationToken;
}


export const generatePasswordResetToken = async (email: string) => {
   const token = randomUUID();
   const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
   const existingToken = await getPasswordResetTokenByEmail(email);

   if (existingToken) {
      await db.passwordResetToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }

   const passwordResetToken = await db.passwordResetToken.create({
      data: {
         email,
         token,
         expires
      }
   })
   return passwordResetToken;
}

export const generateTwoFactorToken = async (email: string) => {
   const token = randomBytes(10).toString('hex');
   const expires = new Date(Date.now() + 5 * 60 * 1000); // 5min
   const existingToken = await getTwoFactorTokenByEmail(email);

   if (existingToken) {
      await db.twoFactorToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }

   const twoFactorToken = await db.twoFactorToken.create({
      data: {
         email,
         token,
         expires
      }
   })
   return twoFactorToken;
}
