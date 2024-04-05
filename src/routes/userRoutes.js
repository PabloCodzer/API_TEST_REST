import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const rota = new Router();


// rota.get('/', loginRequired, UserController.index); // liata usuarios
// rota.get('/:id', UserController.show); // lista usuario

//parte do crud
rota.post('/', UserController.store);
rota.put('/', loginRequired,UserController.update);
rota.delete('/',loginRequired, UserController.delete);

export default rota;