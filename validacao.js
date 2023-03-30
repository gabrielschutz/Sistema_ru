const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// Configuração do servidor Express.js
const app = express();
const port = 1337;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página de sucesso
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para a página de login
app.get('/login', (req, res) => {
  res.render('login', { error: false });
});

app.post('/login', async (req, res) => {
  // Obtenção dos dados do formulário de login
  const ra = req.body.ra;
  const senha = req.body.senha;

  try {
    // Conexão com o banco de dados MongoDB
    const client = new MongoClient("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await client.connect();

    const database = client.db("teste");
    const colecao = database.collection('lista');

    const query = { ra: ra, senha: senha };

    const usuario = await colecao.findOne(query);

    if (usuario){
      const nomeUsuario = usuario.nome;
      const saldo = usuario.saldo;
      res.render('pagusuario', { nomeUsuario, saldo });
    }else{
      res.render('login', { error: "Usuário e/ou senha inválidos." });
    }
  } catch (error) { console.log(error) }
});

app.post('/adicionar', function(req, res) {

  const creditos = req.body.creditos;

  console.log($creditos);

});


// Inicialização do servidor na porta 1337
app.listen(port, function () {
  console.log(`Servidor iniciado na porta ${port}`);
});

