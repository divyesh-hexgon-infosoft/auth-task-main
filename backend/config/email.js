const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, token) => {
    // Properly encode the GraphQL query string
    const query = encodeURIComponent(`mutation { verifyEmail(token: "${token}") }`);
    const verificationUrl = `http://localhost:4000/graphql?query=${query}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Email Verification</h2>
            <p>Thank you for registering. Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">
                Verify Email
            </a>
            <p>If the above button doesn't work, you can also click the link below:</p>
            <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        `
    });
};


module.exports = sendVerificationEmail;

