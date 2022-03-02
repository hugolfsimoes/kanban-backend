const { client } = require('./connection');
client.connect();

const getAllUsers = async () => {
  const { rows } = await client.query("SELECT first_name,last_name, email, role, date  FROM public.users");
  return rows;
};

const getUserByEmail = async (email) => {
  const result =
    await client.query(`SELECT id, first_name, last_name, email, password, role FROM users WHERE email = $1`,
      [email]);
  return result;
};

const createNewUser = async ({ first_name, last_name, email, passwordHash }, role = 'user') => {

  try {
    const result = await client.query(`INSERT INTO "users" (first_name, last_name, email, password, role)
     VALUES ($1, $2, $3, $4, $5)`,
      [first_name, last_name, email, passwordHash, role]);
    return true;
  } catch (error) {
    console.log(error.stack);
    return false;
  }
};


module.exports = { getAllUsers, createNewUser, getUserByEmail };