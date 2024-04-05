import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const rota = new Router();

rota.get('/', HomeController.index);

export default rota;