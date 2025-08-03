// This file is to send emails to users who login

import nodemailer from 'nodemailer'

// Creates a transporter object using nodemailer.createTransport(), which sets up the connection to the SMTP server (smtp-relay.brevo.com on port 587).
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    // Uses authentication credentials (user and pass) from environment variables for security.
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    } 
})

export default transporter