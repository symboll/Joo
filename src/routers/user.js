const Router = require('koa-router')
const User = require('../controller/user')

const router = new Router({ prefix: '/user' })
const user = new User()

router.post('/', user.index)
//注册
router.post('/register', user.register)

module.exports = router