"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const rota = new (0, _express.Router)();

rota.get('/', _AlunoController2.default.index);
rota.get('/:id', _AlunoController2.default.show);
rota.post('/', _loginRequired2.default ,_AlunoController2.default.store);
rota.put('/:id', _loginRequired2.default,_AlunoController2.default.update);
rota.delete('/:id', _loginRequired2.default ,_AlunoController2.default.delete);
exports. default = rota;