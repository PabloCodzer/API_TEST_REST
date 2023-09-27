const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyparser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

// global configs, para usar em todas as rotas
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use( (req, res, nx )=>{ 
    // * são todos os servers
    res.header('Acess-Control-Allow-Origin', '*');

    res.header(
        'Acess-Control-Allow-Origin', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    
    if(req.method === "OPTIONS")
    {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
        return res.status(200).send({});
    }
    nx();
});



// Rotas de pedidos
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// caso não encontre a rota
app.use((req, res, next)=>{
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
});
app.use((error,req, res, next)=>{
    res.status(error.status||500).send({
        erro:{ mensagem: error.message }
    });
});

module.exports = app;