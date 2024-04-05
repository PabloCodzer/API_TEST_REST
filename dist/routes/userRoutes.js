"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const rota = new (0, _express.Router)();


// rota.get('/', loginRequired, UserController.index); // liata usuarios
// rota.get('/:id', UserController.show); // lista usuario

//parte do crud
rota.post('/', _UserController2.default.store);
rota.put('/', _loginRequired2.default,_UserController2.default.update);
rota.delete('/',_loginRequired2.default, _UserController2.default.delete);

exports. default = rota;