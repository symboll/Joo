const { UserModel } = require('../models/user')
const { Exception, Success } = require('../resModel')
class User {

  async register (ctx, next) {
    // 校验 
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
}

module.exports = User