// Importando Express 

const express = require("express"); 
const router = express.Router(); 
const fs = require('fs');

    //ETAPA01 - CRIANDO 5 ROTAS + ROTA DE ERRO
    router.get('/', (req, res) =>{

        res.sendFile(__dirname + "/view/index.html") 

    });

    router.get('/selecao58', (req, res) =>{

        res.sendFile(__dirname + "/view/selecao58.html")      

    });

    router.get('/selecao62', (req, res) =>{

        res.sendFile(__dirname + "/view/selecao62.html")      

    });

    router.get('/selecao70', (req, res) =>{

        res.sendFile(__dirname + "/view/selecao70.html")      

    });

    router.get('/selecao02', (req, res) =>{

        res.sendFile(__dirname + "/view/selecao02.html")      

    });


    //ETAPA02 - VERIFICANDO O CONTEUDO DO ARQUIVO texto.md 
    router.get("/entrada", (req, res) => {
        res.sendFile(__dirname + "/entrada/texto.md");
    });

    router.get('/links', (req, res) => {
        fs.readFile(__dirname + '/entrada/texto.md', 'utf8', (err, data) => {
        
        const regex = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        const links = data.match(regex);
    
        res.send('Existe links, e são eles: '+ links);
        });
    });

    router.get('/validar', (req, res) => {
     fs.readFile(__dirname + '/entrada/texto.md', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(404).sendFile(__dirname + '/view/erro404.html');
      }

      if (data) {
        console.error(data);
        return res.status(200).send('o arquivo texto.md existe');
      }

      if (!links) {
        return res.status(500).send('Não existe');
      }


      const regex = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      const links = data.match(regex);

      res.send('O arquivo é válido');
    });
  });

    router.use((req, res, next) => {
        res.status(404).sendFile(__dirname + '/view/erro404.html');
    });

const app = express(); 
app.use('/', router); 
module.exports = app; 

