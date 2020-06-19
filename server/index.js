const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 1111;

/** Middleware **/
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));