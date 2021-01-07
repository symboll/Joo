module.exports = {
  database: {
    dbName: 'apple',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '08928214lkh'
  },
  security: {
    key: 'Symbol',
    expiresIn: 60* 60
  },
  wx: {
    appId: 'wx9766f0af0dbeb256',
    appSecret:'083479fe98d26e4b71a900134b547ae6',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}