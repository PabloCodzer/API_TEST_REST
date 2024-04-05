import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';
import Aluno from '../models/Aluno';

const upload = multer(multerConfig).single('foto');

class FotoController{

  async store(req, res)
  {
    return upload(req, res, async (error)=>{
      if(error)
      {
        return res.status(400).json({
          errors: [error.code],
        });
      }
    try{
      const {aluno_id} = req.body;
      if(!aluno_id)
      {
        return res.json({ 'erro' : 'id do aluno é necessario' });
      }
      const aluno = await Aluno.findByPk(aluno_id);
      console.log(aluno);
      if(!aluno)
      {
        return res.json({ 'erro' : 'aluno não existe' });
      }

      const {originalname, filename} = req.file;
      const foto = await Foto.create({originalname, filename, aluno_id});
      return res.json(foto);
    }
    catch(e)
    {
      res.status(401).json({erro :  "Não pode subir foto",});
    } 
    });
  }
}

export default new FotoController();