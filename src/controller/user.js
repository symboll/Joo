const { UserModel } = require('../models/user')
const { Exception } = require('../exception')
class User {
  async index (ctx, next) {
    // const path = ctx.params
    // const query = ctx.request.query
    // const headers = ctx.request.header
    // const body = ctx.request.body

    // ctx.body = { status: 0, data: {
    //   path,
    //   query,
    //   headers,
    //   body
    // }}
  }

  async register (ctx, next) {
    // 校验 
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    const nickname =ctx.request.body.nickname

    // 检验是否重复
    const hasRepeat =await UserModel.findOne({
      where: { email }
    })

    if (hasRepeat.id) { throw new Exception(`${email}该邮箱已经注册过!`) }
    
    try {
      const res = await UserModel.create({
        email,
        password,
        nickname
      })
      ctx.body = {
        res: res.id
      }
    }catch (e) {
      throw new Exception('注册失败!')
    }
  }
}

module.exports = User