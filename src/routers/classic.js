const Router = require('koa-router')
const Classic = require('../controller/classic')
const Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/classic' })
const classic = new Classic()
const auth = new Auth()

router.get('/laster', auth.check(), classic.laster)

router.post('/:action', auth.check(), classic.sibling)

// 获取某一期的 详情
router.get('/info', auth.check(), classic.info)

module.exports = router