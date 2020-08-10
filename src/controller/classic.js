const { Exception, Success } = require('../resModel')
const { Flow} = require('../models/flow')
const { Art } = require('./art')
const { actionType } = require('@/util')

class Classic {
  async laster (ctx, next) {

    // 按照index降序 取第一个。
    const flow = await Flow.findOne({
      order: [
        ['index', 'desc']
      ]
    })
    
    if(flow) {
      const uid = ctx.auth.uid
      const art = await Art.getData(flow.art_id, flow.type)
      const favor = await Art.isFavor(flow.art_id, flow.type, uid)
      const { delete_at, update_at, create_at,
            ...artInfo } = art.dataValues || {}
      ctx.body = new Success('成功', 200, {
        ...artInfo,
        index: flow.index,
        favor: favor ? true : false
      })
    } else {
      throw new Exception('获取最新期刊信息失败!')
    }
  }

  async sibling(ctx, next) {
    const { current } = ctx.request.body
    const { action } = ctx.params
    //  数据验证:  
    // current: Number 类型。
    // action enum类型  next/ prev
    if(!actionType[action]) { throw new Exception('Not Found',404) }

    let flow;
    switch (action) {
      case 'next':
        flow = await Flow.findOne({
          where: {
            index: current+ 1
          }
        })
        break;
      case 'prev':
        flow = await Flow.findOne({
          where: {
            index: current - 1
          }
        })
        break;
      default: flow = {}
    }
    
    
    if(flow) {
      const uid = ctx.auth.uid
      const art = await Art.getData(flow.art_id, flow.type)
      const favor = await Art.isFavor(flow.art_id, flow.type, uid)
      const { delete_at, update_at, create_at,
            ...artInfo } = art.dataValues || {}
      ctx.body = new Success('成功', 200, {
        ...artInfo,
        index: flow.index,
        favor: favor ? true : false
      })
    }else {
      throw new Exception( `找不到${action === 'next'? '下':'上'}一期刊内容!`)
    }
  }

  async info(ctx, next) {
    let { type, art_id } = ctx.query
    type = Number(type)
    art_id = Number(art_id)
    const uid = ctx.auth.uid
    const art = await Art.getData(art_id,type)
    const favor = await Art.isFavor(art_id,type,uid)

    if(!art) {
      throw new Exception('查询不到这一次期刊信息!')
    } else {
      const { delete_at, update_at, create_at,
        ...artInfo } = art.dataValues || {}

      ctx.body = new Success('成功', 200, {
        ...artInfo,
        favor: favor ? true : false
      })
    }   
  }
}

module.exports = Classic