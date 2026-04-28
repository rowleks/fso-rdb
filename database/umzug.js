const { Umzug, SequelizeStorage } = require('umzug')

const runUmzug = async ({ sequelize, glob, tableName, successLabel }) => {
  const umzug = new Umzug({
    migrations: {
      glob,
    },
    storage: new SequelizeStorage({ sequelize, tableName }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })

  const migrations = await umzug.up()
  console.log(
    `${successLabel}:`,
    migrations.map(m => m.name)
  )
}

const runMigrations = async sequelize =>
  runUmzug({
    sequelize,
    glob: 'database/migrations/*.js',
    tableName: 'migrations',
    successLabel: 'Migrations applied',
  })

const runSeedMigration = async sequelize =>
  runUmzug({
    sequelize,
    glob: 'database/seeders/*.js',
    tableName: 'seed_migrations',
    successLabel: 'Seed migrations applied',
  })

module.exports = { runMigrations, runSeedMigration }
