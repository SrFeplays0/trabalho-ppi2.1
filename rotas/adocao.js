const express = require('express');
const router = express.Router();

router.get('/adocao', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile('adocao.html', { root: './public' });
  } else {
    res.redirect('/');
  }
});

router.post('/adocao', (req, res) => {
  const { interessado, pet } = req.body;
  const interessadoNome = req.app.locals.interessados.find(i => i.id === parseInt(interessado)).nome;
  const petNome = req.app.locals.pets.find(p => p.id === parseInt(pet)).nome;
  req.app.locals.adocoes.push({ id: req.app.locals.adocoes.length + 1, interessadoNome, petNome, data: new Date() });
  res.redirect('/adocao');
});

router.get('/adocao/list', (req, res) => {
  res.json(req.app.locals.adocoes);
});

module.exports = router;
