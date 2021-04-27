// 云函数入口文件
const cloud = require('wx-server-sdk')

const rp = require('request-promise')

const TcbRouter = require('tcb-router')

cloud.init()

const db = cloud.database()

const BASE_URL = 'http://47.115.57.59:3000'

// 云函数入口函数
exports.main = async (event, context) => {
  
  const app = new TcbRouter({ event })
  
  app.router('playlist', async (ctx, next)=> {
    const { start, count } = event

    const { total } = await db.collection('playlist').count()

    const { data } = await db.collection('playlist')
      .skip(start)
      .limit(count)
      .orderBy('trackNumberUpdateTime', 'desc')
      .get()
    
    ctx.body =  { total, data }
    
  })

  return app.serve()

}