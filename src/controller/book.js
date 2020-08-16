const { Exception, Success } = require('../resModel')
const { BookModel } = require('../models/book')
const { Favor } = require('../models/favor')
class Book {
  async hotlist (ctx,next) {
    const books = await BookModel.findAll({
      order: ['index']
    })

    if(!books) { throw new Exception('查询不到书籍信息!',400)}
  
    let list = [],ids = []

    let favor = await Favor.findAll({
      where: {
        type: 400
      }
    })
    if(!favor) { favor = []}

    favor.forEach(item => {
      ids.push(item.art_id)
    })

    books.forEach(item => {
      const { delete_at, update_at, create_at, ...obj} = item.dataValues
      obj.isfavor = ids.includes(item.id) ? true : false
      list.push(obj)
    })

    ctx.body  = new Success('成功', 200, list )

  }

  async detail(ctx, next) {
    let { id } = ctx.params
    id = Number(id) ?  Number(id) : 0
    


  }
}

module.exports = Book;
