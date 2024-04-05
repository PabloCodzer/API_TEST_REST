"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../config/database');
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController{
    async geratoken(req, res)
    {
      const {email = "",  password = ""} = req.body;
  
      if(!email || !password)
      {
        const erros = {erro : "credenciais inválidas"}
        return res.status(400).json(erros);
      }

      const user = await _User2.default.findOne({ where : {email}});

      if(!user)
      {
        const erros = {erro : "usuario inválido"}
        return res.status(400).json(erros);
      }

      if( !(await user.validaPassword(password)) )
      {
        const erros = {erro : "senha errada"}
        return res.status(400).json(erros);
      }

      const {id} = user;
      const token = _jsonwebtoken2.default.sign({id, email}, process.env.TOKEN_SECRET, { expiresIn : process.env.TOKEN_EXPIRIRATION });
      res.json(token);
    }
}

exports. default = new TokenController();