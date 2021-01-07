const Router = require('koa-router')
const User = require('../controller/user')

const router = new Router({ prefix: '/user' })
const user = new User()

//注册
router.post('/register', user.register)

// 登录
router.post('/login', user.login)

module.exports = router