const UsersModel = require('../models/userModel');
const UserValidations = require('../schemas/userValidations');
require('dotenv/config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '50m'
};

const getAllUsers = async () => {
  const users = await UsersModel.getAllUsers();
  return users;
};

const createNewUser = async ({ first_name, last_name, email, password }) => {
  try {
    await UserValidations.createUserValidation({ first_name, last_name, email, password });
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');
    const result = await UsersModel.createNewUser({ first_name, last_name, email, passwordHash });
    return result;

  } catch (error) {
    console.log(error.message);
  }
};

const login = async ({ email, password }) => {

  try {
    const user = await UserValidations.loginValidation(email, password);
    user.password = undefined;
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET, jwtConfig);
    payload.token = token;
    return payload;
  } catch (error) {
    console.log(error.message);
    throw error;
  }

};

module.exports = { getAllUsers, createNewUser, login };