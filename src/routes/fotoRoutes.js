import { Router } from 'express';
import FotoController from '../controllers/FotoController';
import loginRequired from '../middlewares/loginRequired';

const rota = new Router();

rota.post('/', loginRequired,FotoController.store);

export default rota;