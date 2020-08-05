const bcrypt = require('bcryptjs')
const axios = require('axios')
const util = require('util')


const { UserModel } = require('../models/user')
const { Exception, Success } = require('../resModel')
const {getToken, authType, loginType } = require('../util')
const { wx: {appId,appSecret, loginUrl } } = require('../config')

class User {

  async register (ctx, next) {
    // 参数校验 
    const body = ctx.request.body
    const { email, password, nickname } = body

    // 检验是否重复
    const hasRepeat =await UserModel.findOne({
      where: { email }
    })

    if (hasRepeat) { throw new Exception(`${email}该邮箱已经注册过!`) }

    try {
      const res = await UserModel.create({
        email,
        password,
        nickname
      })
      ctx.body = new Success('注册成功', 201, { res: res.id })
    }catch (e) {
      throw new Exception(`注册失败${e}!`)
    }
  }
  
  async login (ctx, next) {
    // 参数校验
    const body = ctx.request.body
    const { email, password, type } = body
    
    // 校验type 
    if(!loginType[type]) { throw new Exception(`登录type不合法`) }

    switch (type) {
      case loginType.USER_MINI_PROGRAM: 
      
        const { code } = ctx.request.body
        const url = util.format(loginUrl, appId, appSecret, code)
        const result = await axios.get(url)
        if (result.status === 200 && !result.data.errCode ) {
          let user = await UserModel.findOne({
            where: { openid: result.data.openid}
          })
          if(!user){
            user = await UserModel.create({
              openid: result.data.openid
            })
          }
          const token = getToken(user.id, authType.USER)
          ctx.body = {
            token
          }
        }else {
          throw new Exception('openid获取失败: '+ result.data.errmsg)
        }
        
      break;

      case loginType.USER_EMAIL: 

        const hasRegister = await UserModel.findOne({
          where: { email }
        })
        if (!hasRegister) { throw new Exception('账号不存在', 404) }
        
        const isEqual = bcrypt.compareSync(password, hasRegister.password)
    
        if (!isEqual) {
          throw new Exception('密码错误！')
        } else {
          const token = getToken(hasRegister.id, authType.USER)

          ctx.body = new Success('登录成功', 200, {        
            nickname: hasRegister.nickname,
            email: hasRegister.email,
            token
          })
        }
      break;

      case loginType.USER_MOBILE: 
      break;

      default: throw new Exception(`登录type不合法`);
    }
  }

}

module.exports = User