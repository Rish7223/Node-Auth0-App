require('dotenv').config();
const express = require('express');
const path = require('path');
const authConfig = require('./middleware/auth0');
const routes = require('./routes');
const app = express();

// pug setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//setting up static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(authConfig);
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server is listing on port 4000');
});
