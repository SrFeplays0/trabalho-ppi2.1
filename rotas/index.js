const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

router.get('/menu', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile('menu.html', { root: './public' });
  } else {
    res.redirect('/');
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.loggedIn = true;
    res.cookie('lastAccess', new Date().toISOString());
    res.redirect('/menu');
  } else {
    res.redirect('/');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
