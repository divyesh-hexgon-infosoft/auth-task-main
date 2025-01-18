const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createUser, getUserByEmail, verifyUser, storeResetToken, resetPasswordByToken } = require('../models/User');
const sendVerificationEmail = require('../config/email');
const generateToken = require('../utils/generateToken');
require('dotenv').config();

module.exports = {
    login: async ({ email, password }) => {
        const user = await getUserByEmail(email);
        if (!user || !user.is_verified) throw new Error('User not found or not verified');
        if (user.role !== 'admin') throw new Error('Only admins can log in');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Incorrect password');

        const token = generateToken(user.id, user.role);

        return { userId: user.id, token };
    },

    register: async ({ name, email, password, role }) => {
        const existingUser = await getUserByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        await createUser(name, email, hashedPassword, role, verificationToken);
        await sendVerificationEmail(email, verificationToken);

        return 'User registered! Check your email to verify your account.';
    },

    verifyEmail: async ({ token }) => {
        const result = await verifyUser(token);
        if (result[0].affectedRows === 0) throw new Error('Invalid token');

        return 'Email successfully verified!';
    },

    forgotPassword: async ({ email }) => {
        const user = await getUserByEmail(email);
        if (!user) throw new Error('User not found');

        const resetToken = crypto.randomBytes(32).toString('hex');
        await storeResetToken(email, resetToken);

        await sendVerificationEmail(email, resetToken); // Sending email with reset link

        return 'Password reset link sent!';
    },


    resetPassword: async ({ token, newPassword }) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await resetPasswordByToken(token, hashedPassword);
        
        if (result[0].affectedRows === 0) throw new Error('Invalid or expired token');

        return 'Password has been reset!';
    }
};

