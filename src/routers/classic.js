const Router = require('koa-router')
const Classic = require('../controller/classic')
const Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/classic' })
const classic = new Classic()
const auth = new Auth()

router.get('/laster', auth.check(), classic.laster)


module.exports = router