const UsersService = require('../services/userService');

const getAllUsers = async (req, res) => {
  const users = await UsersService.getAllUsers();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const users = await UsersService.createNewUser({ first_name, last_name, email, password });
    res.status(200).json(users);
  } catch (error) {
    res.status(error.code).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await UsersService.login({ email, password });
    res.status(200).json(data);
  } catch (error) {
    res.status(error.code).json(error.message);
  }
};



module.exports = { createUser, getAllUsers, login };