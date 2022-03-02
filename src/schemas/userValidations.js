const crypto = require('crypto');
const UsersModel = require('../models/userModel');

const createUserValidation = async ({ first_name, last_name, email, password }) => {
  if (!first_name || !last_name || !email || !password) {
    const error = new Error('All fields must be filled');
    error.code = 400;
    throw error;
  }
  if (password.length < 8) {
    const error = new Error('Password must be at least 8 characters long');
    error.code = 400;
    throw error;
  }
  const user = await UsersModel.getUserByEmail(email);
  if (user.rowCount) {
    const error = new Error('This email already exists');
    error.code = 401;
    throw error;
  }
};

const loginValidation = async (email, password) => {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.code = 400;
    throw error;
  }
  const user = await UsersModel.getUserByEmail(email);
  if (!user.rowCount) {
    const error = new Error('User not found');
    error.code = 404;
    throw error;
  }
  const passwordHash = crypto.createHash('md5').update(password).digest('hex');
  if (user.rows[0].password !== passwordHash) {
    const error = new Error('Incorrect username or password');
    error.code = 401;
    throw error;
  }
  return user.rows[0];
};

module.exports = { loginValidation, createUserValidation };