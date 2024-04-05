import express from 'express';
import homeRota from './routes/homeRoutes';
import userRota from './routes/userRoutes';
import tokenRota from './routes/tokenRoutes';
import alunoRota from './routes/alunoRoutes';
import fotoRota from './routes/fotoRoutes';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
import './database';

class App{
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares()
  {
    this.app.use(express.urlencoded({ extended:true }));
    this.app.use(express.json());
    this.app.use('/images/',express.static(resolve(__dirname,'..', 'uploads', 'images')));
  }

  routes()
  {
    this.app.use('/', homeRota);
    this.app.use('/users/', userRota);
    this.app.use('/token/', tokenRota);
    this.app.use('/alunos/', alunoRota);
    this.app.use('/fotos/', fotoRota);
  }
}

export default new App().app;