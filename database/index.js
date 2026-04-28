const { Sequelize } = require('sequelize')
const config = require('../utils/config')
const {
  runMigrations,
  downMigrations,
  downMigrationsAll,
  runSeedMigration,
  downSeedMigration,
  downSeedMigrationAll,
} = require('./umzug')

const sequelize = new Sequelize(config.DATABASE_URL, {
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

module.exports = {
  sequelize,
  connectDB,
  runMigrations: async () => runMigrations(sequelize),
  downMigrations: async () => downMigrations(sequelize),
  downMigrationsAll: async () => downMigrationsAll(sequelize),
  runSeedMigration: async () => runSeedMigration(sequelize),
  downSeedMigration: async () => downSeedMigration(sequelize),
  downSeedMigrationAll: async () => downSeedMigrationAll(sequelize),
}
