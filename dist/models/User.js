"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model{

  static init(sequelize){
    super.init({

      nome: {
        type : _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3,255],
            msg: 'Campo nome precisa ter entre 3 e 255 caracteres'
          },
        }
      },
      
      email:{
        type : _sequelize.Sequelize.STRING,
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
        type : _sequelize.Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type : _sequelize.Sequelize.VIRTUAL,
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
                                    user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
                                  }
                });
    return this;
  }

  validaPassword(password)
  {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;