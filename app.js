const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Use uma porta disponível

// Configurações
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'seu-segredo',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1800000 } // 30 minutos
}));

// Mock data (mantenha os dados globais aqui)
app.locals.interessados = [];
app.locals.pets = [];
app.locals.adocoes = [];

// Rotas
const indexRouter = require('./rotas/index');
const cadastroInteressadoRouter = require('./rotas/cadastroInteressado');
const cadastroPetRouter = require('./rotas/cadastroPet');
const adocaoRouter = require('./rotas/adocao');

app.use('/', indexRouter);
app.use('/', cadastroInteressadoRouter);
app.use('/', cadastroPetRouter);
app.use('/', adocaoRouter);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
