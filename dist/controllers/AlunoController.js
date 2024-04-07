"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController{


  async index(req, res)
  {
    try{
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome','email', 'peso', 'altura'],
        order: [['id', 'DESC']],
        include: {
          model : _Foto2.default,
          attributes: ['filename', 'url']
        }
      }); 
      res.status(201)
      .json({
        usuarios : alunos
      });
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro : "Erro ao buscar alunos",
      });
    }
  }

  async show(req, res)
  {
    try{
      const {id} = req.params;

      if(!id)
      {
        return res.status(401).json({ erro :  "id não existe" });
      }

      const aluno = await _Aluno2.default.findByPk(id,{
        attributes: ['id', 'nome', 'sobrenome','email', 'peso', 'altura'],
        include: {
          model : _Foto2.default,
          attributes: ['filename', 'url']
        }
      });

      if(!aluno)
      {
        return res.status(401).json({ erro :  "Aluno não existe" });
      }
      res.status(201).json(aluno);

    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  "id não existe",
      });
    }
  }

  async store(req, res)
  {
    try{
        const novoAluno = await _Aluno2.default.create(req.body);
        const {id, email, nome, peso, atura} = novoAluno
        res.status(200).json( {id, email, nome, peso, atura} );
    }
    catch(e)
    {
      res.status(401).json({erro :  e.errors.map(err => err.message)})
    }
  }

  async update(req, res)
  {
   try{
      const {id} = req.params;

      if(!id)
      {
        return res.status(401).json({ erro :  "id não existe" });
      }
      const aluno = await _Aluno2.default.findByPk(id);

      if(!aluno)
      {
        return res.status(400).json({ erro :  ['ID não Existe'], });
      }

      const alunoEditado = await aluno.update(req.body);
      const { nome, sobrenome, email, altura, peso} = alunoEditado;
      return res.status('201').json({id, nome, sobrenome, email, altura, peso});
    }
    catch(e)
    {
      res.status(401).json({ erro :   ["não pode atualizar"]})
    }
  }

  async delete(req, res)
  {
    try{
      const {id} = req.params;

      if(!id)
      {
        return res.status(401).json({ erro :  "id não existe" });
      }
      
      const aluno = await _Aluno2.default.findByPk(id);

      if(!aluno)
      {
        return res.status(400).json({ erro :  ['ID não Existe'], });
      }

      const alunoExcluido = await aluno.destroy();
      const { nome, sobrenome, email, altura, peso} = alunoExcluido;
      return res.status('201').json({id, nome, sobrenome, email, altura, peso});
   }
   catch(e)
   {
     res.status(401).json({ erro :   ["não pode atualizar"]})
   }
  }

}

exports. default = new AlunoController();