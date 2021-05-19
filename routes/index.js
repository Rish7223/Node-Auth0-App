const express = require('express');
const Router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const NewsApi = require('newsapi');

const newsapi = new NewsApi(process.env.NEWS_API_KEY);

Router.get('/', (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  if (isAuthenticated) {
    res.render('home', {
      user: req.oidc.user,
      isAuthenticated: true,
    });
    return;
  }
  res.render('home', { isAuthenticated: false });
});

Router.get('/profile', requiresAuth(), (req, res) => {
  const data = req.oidc.user;
  res.send(JSON.stringify(data));
});

Router.get('/news', requiresAuth(), async (req, res) => {
  res.status(200).render('categories', {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

Router.get('/news/:category', requiresAuth(), async (req, res) => {
  try {
    const id = req.params.category;
    const response = await newsapi.v2.sources({
      category: id,
      language: 'en',
      country: 'us',
    });
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).send('News api request failed');
    }
  }
});

module.exports = Router;
