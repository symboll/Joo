const Router = require('koa-router')
const Classic = require('../controller/classic')

const router = new Router({ prefix: '/classic' })
const classic = new Classic()

router.get('/laster', classic.laster)


module.exports = router