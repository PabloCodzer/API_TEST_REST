import { Model, Sequelize } from "sequelize";
import bcrypt from 'bcryptjs';

export default class User extends Model{

  static init(sequelize){
    super.init({

      nome: {
        type : Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3,255],
            msg: 'Campo nome precisa ter entre 3 e 255 caracteres'
          },
        }
      },
      
      email:{
        type : Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email inválido'
          },
        },
        unique: {
          msg: 'Email ja existe'
        },
      },

      password_hash: {
        type : Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type : Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [3,55],
            msg: 'Campo senha precisa ter entre 3 e 55 caracteres'
          },
        }
      },
    }, 
    {
      sequelize
    });

    this.addHook('beforeSave', 
                  async (user) => {
                                  if(user.password)
                                  { 
                                    user.password_hash = await bcrypt.hash(user.password, 8);
                                  }
                });
    return this;
  }

  validaPassword(password)
  {
    return bcrypt.compare(password, this.password_hash);
  }
}