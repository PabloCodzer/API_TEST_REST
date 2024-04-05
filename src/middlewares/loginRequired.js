import jwt from 'jsonwebtoken';
import User from "../models/User";

export default async(req, res, next)=>{

    const {authorization} = req.headers;

    if(!authorization)
    {
      return res.status(401).json({
        erros : ['É necessário fazer login']
      });
    }

    const [texto, token] = authorization.split(' ');

    try{
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const {id, email} = dados;

      const usuario = await User.findOne({
        where: { 
                  id: id, 
                  email:email 
                }
              }); 
      if (!usuario)
      {
        return res.status(401).json({
          errors : ['Usuario inválido']
        });
      }

      // este parametro vai ser carregado aqui, para que outros controladores tenham acesso ao usuario que esta logado
      req.userId = id;
      req.userEmail = email;

      return next();
    }
    catch(e)
    {
      return res.status(401).json({
        errors : ['Token expirado ou inválido']
      });
    }
}