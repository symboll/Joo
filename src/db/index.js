const { Sequelize } = require('sequelize')
const { database: {
  dbName,
  user,
  password,
  host,
  port
}} = require('../config')

const sequelize = new Sequelize(
  dbName,
  user,
  password,
  {
    dialect: 'mysql',
    host: host,
    port: port,
    // logging: false,
    timezone: '+08:00',
    define: {
      timestamps: true,
      paranoid: true,
      createdAt: 'create_at',
      updatedAt: 'update_at',
      deletedAt: 'delete_at'
    }
  }
)

sequelize.sync({
  // force: true   // 删除表重新创建
})

module.exports = { sequelize }