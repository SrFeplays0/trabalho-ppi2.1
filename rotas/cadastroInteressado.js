const express = require('express');
const router = express.Router();

router.get('/cadastro-interessado', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile('cadastro-interessado.html', { root: './public' });
  } else {
    res.redirect('/');
  }
});

router.post('/cadastro-interessado', (req, res) => {
  const { nome, email, telefone } = req.body;
  req.app.locals.interessados.push({ id: req.app.locals.interessados.length + 1, nome, email, telefone });
  res.redirect('/cadastro-interessado');
});

router.get('/cadastro-interessado/list', (req, res) => {
  res.json(req.app.locals.interessados);
});

module.exports = router;
