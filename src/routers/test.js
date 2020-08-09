const Router = require('koa-router')
const Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/test' })
const authType = require('../util/enum_auth_type')

const auth = new Auth(authType.USER)

const { Favor } = require('../models/favor')
//注册
router.post('/', auth.check(), async (ctx, next) => {
  console.log('param-->', ctx.params)
  console.log('query-->', ctx.request.query)
  console.log('body-->', ctx.request.body)
  console.log('headers-->',ctx.request.header)
  ctx.body = {
    id: ctx.auth.uid
  }
})

router.get('/getFavor', async(ctx, next)=> {
  const favor = await Favor.findAll()

  ctx.body = {
    favor
  }
})

module.exports = router