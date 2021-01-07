class Exception extends Error {
  constructor (message = '服务器异常', status=400, errorCode = -1 ) {
    super()
    this.message = message
    this.status = status          // 状态码
    this.errorCode = errorCode
  }
}

class Success {
  constructor(message = '成功', status = 200, data ={}) {
    this.message = message
    this.status = status
    this.data = data
  } 
}

module.exports = {
  Exception,
  Success
}