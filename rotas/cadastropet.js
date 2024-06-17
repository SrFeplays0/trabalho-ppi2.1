const express = require('express');
const router = express.Router();

router.get('/cadastro-pet', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile('cadastro-pet.html', { root: './public' });
  } else {
    res.redirect('/');
  }
});

router.post('/cadastro-pet', (req, res) => {
  const { nome, raca, idade } = req.body;
  req.app.locals.pets.push({ id: req.app.locals.pets.length + 1, nome, raca, idade });
  res.redirect('/cadastro-pet');
});

router.get('/cadastro-pet/list', (req, res) => {
  res.json(req.app.locals.pets);
});

module.exports = router;
