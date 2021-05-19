require('dotenv').config();
const express = require('express');
const authConfig = require('./middleware/auth0');
const routes = require('./routes');
const app = express();

app.use(authConfig);
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server is listing on port 400');
});
