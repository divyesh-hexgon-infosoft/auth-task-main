const pool = require('../config/database');

const createUser = async (name, email, password, role, verificationToken) => {
    return pool.query(
        "INSERT INTO users (name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, role, verificationToken]
    );
};

const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

const verifyUser = async (token) => {
    return pool.query("UPDATE users SET is_verified = 1 WHERE verification_token = ?", [token]);
};

const storeResetToken = async (email, token) => {
    return pool.query("UPDATE users SET reset_token = ? WHERE email = ?", [token, email]);
};

const resetPasswordByToken = async (token, newPassword) => {
    return pool.query("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", [newPassword, token]);
};

module.exports = { createUser, getUserByEmail, verifyUser, storeResetToken, resetPasswordByToken };
