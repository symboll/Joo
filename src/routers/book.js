const Router = require('koa-router')
const Book = require('../controller/book')
const Auth  = require('../middleWares/auth')

const router = new Router({ prefix: '/book' })
const book = new Book()
const auth = new Auth()



router.post('/hotlist',auth.check(), book.hotlist)

// 书籍详情
router.post('/:id/detail',auth.check(), book.detail)

module.exports = router