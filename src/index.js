const express = require('express');
const cors = require('cors');
const { router } = require('./routes');
require('dotenv/config');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);



app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));