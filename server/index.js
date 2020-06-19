const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();

/** Constants **/
const PORT = process.env.PORT;

/** Middleware **/
app.use(cors());
app.use(express.json());

/** Routes **/
const homeRoutes = require('./routes');
const userRoutes = require('./routes/userCRUD');
app.use('/users', userRoutes);
app.use('/', homeRoutes);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));