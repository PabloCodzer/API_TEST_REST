"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController{
  async store(req, res)
  {
    try{
      const novoUsuario = await _User2.default.create(req.body);
      const {id, email, nome} = novoUsuario
      res.status(200).json( {id, email, nome} );
    }
    catch(e)
    {
      console.log(e);
      res.status(401).json({
        erro      :  e.errors.map(err => err.message),
      });
    }
  }

  async index(req, res)
  {
    try{
      const usuarios = await _User2.default.findAll({attributes: ['id', 'nome', 'email']}); 
      res.status(201)
      .json({
        usuarios : usuarios
      });
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  e.errors.map(err => err.message),
      });
    }
  }

  async show(req, res)
  {
    try{
      const user = await _User2.default.findByPk(req.params.id);
      const {id, email, nome} = user;
      return res.status(201).json({
            usuario  : {id, email, nome}
      });
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  e.errors.map(err => err.message),
      });
    }
  }

  async update(req, res)
  {
    try{

      const user = await _User2.default.findByPk(req.userId);

      if(!user)
      {
        res.status(400)
        .json({
              erro :  ['ID não Existe'],
        });
      }

      const updated = await user.update(req.body);
      const {id, email, nome} = updated;
      return res.status('201').json({id, email, nome});
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  "não deu"
      });
    }
  }

  async delete(req, res)
  {
    try{
      const user = await _User2.default.findByPk(req.userId);
      console.log(user);
      if(!user)
      {
        res.status(400)
        .json({
              erro :  ['ID não Existe'],
        });
      }

      const deletado = await user.destroy();
      const {id, email, nome} = deletado;
      return res.status('201').json({id, email, nome});
    }
    catch(e)
    {
      res.status(401).json({
              erro :  ['brake']
      });
    }
  }
}

exports. default = new UserController();