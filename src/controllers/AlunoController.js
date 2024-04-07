import Aluno from "../models/Aluno";
import Foto from "../models/Foto";

class AlunoController{


  async index(req, res)
  {
    try{
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome','email', 'peso', 'altura'],
        order: [['id', 'DESC']],
        include: {
          model : Foto,
          attributes: ['filename', 'url']
        }
      }); 
      res.status(201)
      .json({
        usuarios : alunos
      });
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro : "Erro ao buscar alunos",
      });
    }
  }

  async show(req, res)
  {
    try{
      const {id} = req.params;

      if(!id)
      {
        return res.status(401).json({ erro :  "id não existe" });
      }

      const aluno = await Aluno.findByPk(id,{
        attributes: ['id', 'nome', 'sobrenome','email', 'peso', 'altura'],
        include: {
          model : Foto,
          attributes: ['filename', 'url']
        }
      });

      if(!aluno)
      {
        return res.status(401).json({ erro :  "Aluno não existe" });
      }
      res.status(201).json(aluno);

    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  "id não existe",
      });
    }
  }

  async store(req, res)
  {
    try{
        const novoAluno = await Aluno.create(req.body);
        const {id, email, nome, peso, atura} = novoAluno
        res.status(200).json( {id, email, nome, peso, atura} );
    }
    catch(e)
    {
      res.status(401).json({erro :  e.errors.map(err => err.message)})
    }
  }

  async update(req, res)
  {
   try{
      const {id} = req.params;

      if(!id)
      {
        return res.status(401).json({ erro :  "id não existe" });
      }
      const aluno = await Aluno.findByPk(id);

      if(!aluno)
      {
        return res.status(400).json({ erro :  ['ID não Existe'], });
      }

      const alunoEditado = await aluno.update(req.body);
      const { nome, sobrenome, email, altura, peso} = alunoEditado;
      return res.status('201').json({id, nome, sobrenome, email, altura, peso});
    }
    catch(e)
    {
      res.status(401).json({ erro :   ["não pode atualizar"]})
    }
  }

  async delete(req, res)
  {
    try{
      const {id} = req.params;

      if(!id)
      {
        return res.status(401).json({ erro :  "id não existe" });
      }
      
      const aluno = await Aluno.findByPk(id);

      if(!aluno)
      {
        return res.status(400).json({ erro :  ['ID não Existe'], });
      }

      const alunoExcluido = await aluno.destroy();
      const { nome, sobrenome, email, altura, peso} = alunoExcluido;
      return res.status('201').json({id, nome, sobrenome, email, altura, peso});
   }
   catch(e)
   {
     res.status(401).json({ erro :   ["não pode atualizar"]})
   }
  }

}

export default new AlunoController();