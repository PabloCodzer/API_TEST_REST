import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const rota = new Router();

rota.get('/', AlunoController.index);
rota.get('/:id', AlunoController.show);
rota.post('/', loginRequired ,AlunoController.store);
rota.put('/:id', loginRequired,AlunoController.update);
rota.delete('/:id', loginRequired ,AlunoController.delete);
export default rota;