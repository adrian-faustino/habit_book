const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv').config();

/** Constants **/
const PORT = process.env.PORT;

/** Middleware **/
app.use(cors());
app.use(express.json());
app.use('/', routes);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));