const express = require('express');
const Router = express.Router();
const { requiresAuth } = require('express-openid-connect');

Router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

Router.get('/profile', requiresAuth(), (req, res) => {
  const data = req.oidc.user;
  console.log(data);
  res.send(JSON.stringify(data));
});

module.exports = Router;
