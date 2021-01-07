// 收藏、取消收藏

const Router = require('koa-router')
const Collection = require('../controller/collection')
const Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/collection' })
const collection = new Collection()
const auth = new Auth()

router.post('/', auth.check(), collection.done)

// 获取用户的收藏列表
router.post('/favorlist', auth.check(), collection.list)

module.exports = router