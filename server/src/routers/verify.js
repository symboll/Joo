const Router = require('koa-router')
const User = require('../controller/user')
const router = new Router({ prefix: '/verify' })
const user = new User()

// token验证
router.post('/token', user.verify)


module.exports = router