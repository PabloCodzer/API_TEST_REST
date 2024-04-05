import { password } from "../config/database";
import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController{
    async geratoken(req, res)
    {
      const {email = "",  password = ""} = req.body;
  
      if(!email || !password)
      {
        const erros = {erro : "credenciais inválidas"}
        return res.status(400).json(erros);
      }

      const user = await User.findOne({ where : {email}});

      if(!user)
      {
        const erros = {erro : "usuario inválido"}
        return res.status(400).json(erros);
      }

      if( !(await user.validaPassword(password)) )
      {
        const erros = {erro : "senha errada"}
        return res.status(400).json(erros);
      }

      const {id} = user;
      const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, { expiresIn : process.env.TOKEN_EXPIRIRATION });
      res.json(token);
    }
}

export default new TokenController();