const express = require('express');
const cors = require('cors');
const { usersRoute } = require('./routes');
const error = require('./middlewares/error');
require('dotenv/config');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRoute);
app.use(error);

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));