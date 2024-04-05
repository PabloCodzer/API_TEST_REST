import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const rota = new Router();

rota.get('/', TokenController.geratoken);

export default rota;