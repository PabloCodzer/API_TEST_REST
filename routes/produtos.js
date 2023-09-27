const express = require('express');
const rota = express();
const db = require('../database/maria').pool;
const multer = require('multer');
const upload = multer({dest:'uploads/'})
// rota de fato: Retorna todos os produtos

rota.get('/todos', upload.single('produto_image') ,(req, res, next)=>{

    db.getConnection((err, conn)=>{

        conn.query( "SELECT * FROM produtos_ecomerce.user_test", 
                    (error, resultado, campo)=>{

                        res.status(200).send({ 
                        
                            mensagem : "rota get funcionando",
                            data     : resultado

                        });
        });
    });
});

// rota tipo post, Cadastra 
rota.post('/', (req, res, next)=>{

    var novoProduto = [
        req.body.name,
        req.body.preco
    ]

    db.getConnection((err, conn)=>{

        conn.query( "INSERT INTO produtos_ecomerce.user_test(name, preco) VALUES(?,?)", novoProduto,
                    (error, resultado, campo)=>{

                        conn.release();
                       if(error)
                       {
                            res.status(201).send({
                                mensagem    : "Erro ao cadastrar",
                                erro        : error
                            });
                       }
                       else
                       {
                        res.status(200).send({ 
                        
                            mensagem : "Novo Produto Cadastrado",
                            data     : resultado

                        });
                       }
        });
    });
});

// rota tipo get, consultando id xclusivo 
rota.get('/', (req, res, next)=>{

    var id_produto = req.body.produto_id;
    console.log(id_produto);
  
        db.getConnection((err, conn) => {
            conn.query("SELECT * FROM produtos_ecomerce.user_test WHERE  produto_id = ?; ", [id_produto], 
            (error, resultado, campo)=>{

                if(error)
                {
                    res.status(200).send({
                        mensagem  : "Produto não encontrado" ,
                        data      : resultado
                    }); 
                }
                else
                {
                    res.status(200).send({
                        mensagem  : "rota get com id do podutro: ",
                        data      : resultado
                    }); 
                }
            })
        });
});

// rota de update, ou patch 
rota.patch('/', (req, res, next)=>{

    var updateProduto = [
        req.body.name,
        req.body.preco,
        req.body.id_produto
    ]

    db.getConnection((err, conn)=>{

        conn.query( "UPDATE produtos_ecomerce.user_test SET name = ?, preco = ? WHERE produto_id = ?", updateProduto,
                    (error, resultado, campo)=>{

                        conn.release();
                       if(error)
                       {
                            res.status(201).send({
                                mensagem    : "Erro ao cadastrar",
                                erro        : error
                            });
                       }
                       else
                       {
                        res.status(200).send({ 
                        
                            mensagem : "Produto Atualizado",
                            data     : resultado

                        });
                       }
        });
    });
});

// rota de delete
rota.delete('/', (req, res, next)=>{

    var updateProduto = req.body.id_produto;

    db.getConnection((err, conn)=>{

        conn.query( "DELETE FROM produtos_ecomerce.user_test WHERE produto_id = ?", updateProduto,
                    (error, resultado, campo)=>{
                        conn.release();
                       if(error)
                       {
                            res.status(201).send({
                                mensagem    : "Erro ao excluir",
                                erro        : error
                            });
                       }
                       else
                       {
                        res.status(200).send({ 
                        
                            mensagem : "Produto excluido",
                            data     : resultado

                        });
                       }
        });
    });
});


/* outra forma */ 
rota.delete('/', (req, res, next)=>res.status(200).send({ mensagem: "rota( ou delete mesmo ¬¬ ) funcionando" })); 

module.exports = rota;