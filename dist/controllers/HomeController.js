"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

class HomeController{
  async index(req, res)
  {
    res.status(200).json("Index");
  }

  async store(req, res)
  {
      const novoAluno = await _Aluno2.default.create(req.body);
      const {id, email, nome} = novoAluno;
      res.status(200).json( {id, email, nome} );
  }
}

exports. default = new HomeController();