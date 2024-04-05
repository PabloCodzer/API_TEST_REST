import User from "../models/User";

class UserController{
  async store(req, res)
  {
    try{
      const novoUsuario = await User.create(req.body);
      const {id, email, nome} = novoUsuario
      res.status(200).json( {id, email, nome} );
    }
    catch(e)
    {
      console.log(e);
      res.status(401).json({
        erro      :  e.errors.map(err => err.message),
      });
    }
  }

  async index(req, res)
  {
    try{
      const usuarios = await User.findAll({attributes: ['id', 'nome', 'email']}); 
      res.status(201)
      .json({
        usuarios : usuarios
      });
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  e.errors.map(err => err.message),
      });
    }
  }

  async show(req, res)
  {
    try{
      const user = await User.findByPk(req.params.id);
      const {id, email, nome} = user;
      return res.status(201).json({
            usuario  : {id, email, nome}
      });
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  e.errors.map(err => err.message),
      });
    }
  }

  async update(req, res)
  {
    try{

      const user = await User.findByPk(req.userId);

      if(!user)
      {
        res.status(400)
        .json({
              erro :  ['ID não Existe'],
        });
      }

      const updated = await user.update(req.body);
      const {id, email, nome} = updated;
      return res.status('201').json({id, email, nome});
    }
    catch(e)
    {
      res.status(401)
      .json({
              erro :  "não deu"
      });
    }
  }

  async delete(req, res)
  {
    try{
      const user = await User.findByPk(req.userId);
      console.log(user);
      if(!user)
      {
        res.status(400)
        .json({
              erro :  ['ID não Existe'],
        });
      }

      const deletado = await user.destroy();
      const {id, email, nome} = deletado;
      return res.status('201').json({id, email, nome});
    }
    catch(e)
    {
      res.status(401).json({
              erro :  ['brake']
      });
    }
  }
}

export default new UserController();