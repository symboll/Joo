
const { Movie, Sentence, Music } = require('../models/classic')
const { Flow} = require('../models/flow')
const { Exception, Success } = require('../resModel')
const { Art } = require('./art')

class Classic {
  async laster (ctx, next) {
    const flow = await Flow.findOne({
      order: [
        ['index', 'desc']
      ]
    })
    if(flow) {
      let art = await Art.getData(flow.art_id, flow.type)
      ctx.body = new Success('成功', 200, {
        ...art.dataValues,
        index: flow.index
      })
    } else {
      throw new Exception('获取最新期刊信息失败!')
    }
  }
}

module.exports = Classic