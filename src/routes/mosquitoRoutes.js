import { Router } from 'express';
import MqqttController from '../controllers/MqttController';

const rota = new Router();


// rota.get('/', loginRequired, UserController.index); // liata usuarios
// rota.get('/:id', UserController.show); // lista usuario

//parte do crud
rota.post('/', MqqttController.store);
// rota.put('/', UserController.update);
// rota.delete('/', UserController.delete);

export default rota;