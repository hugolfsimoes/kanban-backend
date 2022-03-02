const jwt = require('jsonwebtoken');
require('dotenv/config');

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not informed' });
  if (token.split(' ')[0] !== 'Bearer')
    return res.status(401).json({ message: 'Token invalid' });
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = payload.data;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = validateJWT;