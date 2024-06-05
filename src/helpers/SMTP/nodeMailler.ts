import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Define the environment variables with their types
const smtpHost: string = process.env.smtp_host!;
const smtpPort: number = parseInt(process.env.smtp_port!, 10);
const smtpUser: string = process.env.smtp_user!;
const smtpPass: string = process.env.smtp_pass!;

// Create a transporter object with the correct types
const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // Use true for port 465, false for all other ports
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
} as SMTPTransport.Options);

interface EmailOptions {
    recipients: string;
    subject: string;
    message: string;
}

export const sendEmail = async ({ recipients, subject, message }: EmailOptions): Promise<void> => {
    try {
        await transporter.sendMail({
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