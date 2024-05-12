import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationMail = async (email: string, token: string) => {

   const confirmLink = `http://localhost:3000/auth/verify-email?token=${token}`

   await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'confirm your email',
      html: '<p>click <a href="' + confirmLink + '">here</a> to confirm your email</p>'
   })
}


export const sendPasswordResetMail = async (email: string, token: string) => {

   const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

   await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'reset your password',
      html: '<p>click <a href="' + resetLink + '">here</a> to reset your password</p>'
   })
}


export const sendTwofactortokenEmail = async (email: string, token: string) => {



   await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'confirm your 2fa',
      html: '<p>your 2fa token is ' + token + '</p>'
   })
}

