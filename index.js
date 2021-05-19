const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
  })
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  const data = req.oidc.user;
  console.log(data);
  res.send(JSON.stringify(data));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server is listing on port 400');
});
