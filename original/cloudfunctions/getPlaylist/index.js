// 云函数入口文件
const cloud = require('wx-server-sdk')

const rp = require('request-promise')

cloud.init()

const db = cloud.database()

const BASE_URL = 'http://47.115.57.59:3000/personalized'


// 云函数入口函数
exports.main = async (event, context) => {

  try {
    let playlist = await rp(BASE_URL).then(res => JSON.parse(res).result)

    let { total } = await db.collection('playid').count() 
    let index

    if(total > 0){ 

      total -= 1 
      const latest = await db.collection('playid').skip(total).limit(1).get()
      index = playlist.findIndex((item) => item.id === latest.data[0].id)

    }else {
      index = undefined
    }

    console.log('index===>', index)

    if(index > 0) {

      playlist = playlist.slice(0, index)

    } else if(index === 0) {

      playlist = []
      return 

    }

    console.log('playlist==>', playlist.length)

    db.collection('playid').add({
      data: {
        id: playlist[0].id,
        createTime: db.serverDate()
      }
    })

    for(let key of playlist) {
      await db.collection('playlist').add({
        data: key
      })
    }

  }catch(err) {
    console.log('err', err)
  }finally {
    
  }

}