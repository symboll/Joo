const Router = require('koa-router')
const  Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/test' })
const authType = require('../util/enum_auth_type')

const auth = new Auth(authType.USER)
//注册
router.post('/', auth.check(), async (ctx, next) => {
  ctx.body = {
    id: ctx.auth.uid
  }
})



module.exports = router