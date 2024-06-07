import nodemailer from 'nodemailer';
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
const sendEmailNodemailer = () =>{
    const smtpOptions ={
        host: process.env.smtp_host,
        port:465,
        secure: true, // Use true for port 465, false for all other ports
        auth: {
            user: process.env.smtp_user,
            pass: process.env.smtp_pass,
        },
    }
    const nodemailerOptions :SMTPTransport.Options = {
        ...smtpOptions
        }
    console.log(nodemailerOptions)
    // Create a transporter object with the correct types
    const transporter = nodemailer.createTransport( nodemailerOptions as SMTPTransport.Options);
    return transporter
   
}
interface EmailOptions {
    recipients: string;
    subject: string;
    message: string;
}


export const sendEmail = async ({ recipients, subject, message }: EmailOptions): Promise<void> => {
    try {
        await sendEmailNodemailer().sendMail({
            from: "aprenant2@talents4starups.com", // sender address
            to: recipients, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: message, // html body
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};