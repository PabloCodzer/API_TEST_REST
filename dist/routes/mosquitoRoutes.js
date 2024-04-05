"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _MqttController = require('../controllers/MqttController'); var _MqttController2 = _interopRequireDefault(_MqttController);

const rota = new (0, _express.Router)();


// rota.get('/', loginRequired, UserController.index); // liata usuarios
// rota.get('/:id', UserController.show); // lista usuario

//parte do crud
rota.post('/', _MqttController2.default.store);
// rota.put('/', UserController.update);
// rota.delete('/', UserController.delete);

exports. default = rota;