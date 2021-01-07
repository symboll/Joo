const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

const { sequelize } = require('../db')

class User extends Model {

}

User.init({
  //主键：  1.不能重复， 2. 不能为空
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue('password',pwd)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
},{
  sequelize,
  tableName: 'user'
})

module.exports = {
  UserModel: User
}