import Aluno from "../models/Aluno";

class HomeController{
  async index(req, res)
  {
    res.status(200).json("Index");
  }

  async store(req, res)
  {
      const novoAluno = await Aluno.create(req.body);
      const {id, email, nome} = novoAluno;
      res.status(200).json( {id, email, nome} );
  }
}

export default new HomeController();