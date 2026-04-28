const { Sequelize } = require('sequelize')
const config = require('../utils/config')
const { Umzug, SequelizeStorage } = require('umzug')

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

const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: {
      glob: 'database/migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  const migrations = await umzug.up()
  console.log(
    'Migrations applied:',
    migrations.map(m => m.name)
  )
}

const runSeedMigration = async () => {
  const umzug = new Umzug({
    migrations: {
      glob: 'database/seeders/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'seed_migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  const migrations = await umzug.up()
  console.log(
    'Seed migrations applied:',
    migrations.map(m => m.name)
  )
}

module.exports = { sequelize, connectDB, runMigrations, runSeedMigration }
