const Router = require('koa-router')
const  Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/test' })
const auth = new Auth()
//注册
router.post('/', auth.check, async (ctx, next) => {
  ctx.body = {
    id: ctx.auth.uid
  }
})



module.exports = router