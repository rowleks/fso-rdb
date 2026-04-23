const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB connected successfully')
  } catch (err) {
    console.error('DB connection failed:', err)
  }
}

module.exports = { sequelize, connectDB }
