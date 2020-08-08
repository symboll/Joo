// 收藏

const Router = require('koa-router')
const { Collection } = require('../controller/collection')
const Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/collection' })
const collection = new Collection()
const auth = new Auth()

router.post('/', auth.check(), collection.done)


module.exports = router