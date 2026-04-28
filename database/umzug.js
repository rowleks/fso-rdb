const { Umzug, SequelizeStorage } = require('umzug')

const initUmzug = ({ sequelize, glob, tableName }) =>
  new Umzug({
    migrations: {
      glob,
    },
    storage: new SequelizeStorage({ sequelize, tableName }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })

const runUmzugUp = async ({ sequelize, glob, tableName, successLabel }) => {
  const umzug = initUmzug({ sequelize, glob, tableName })
  const migrations = await umzug.up()
  console.log(
    `${successLabel}:`,
    migrations.map(m => m.name)
  )
}

const runUmzugDown = async ({
  sequelize,
  glob,
  tableName,
  successLabel,
  all = false,
}) => {
  const umzug = initUmzug({ sequelize, glob, tableName })
  const migrations = all ? await umzug.down({ to: 0 }) : await umzug.down()
  console.log(
    `${successLabel}:`,
    migrations.map(m => m.name)
  )
}

const runMigrations = async sequelize =>
  runUmzugUp({
    sequelize,
    glob: 'database/migrations/*.js',
    tableName: 'migrations',
    successLabel: 'Migrations applied',
  })

const downMigrations = async sequelize =>
  runUmzugDown({
    sequelize,
    glob: 'database/migrations/*.js',
    tableName: 'migrations',
    successLabel: 'Migrations rolled back',
  })

const downMigrationsAll = async sequelize =>
  runUmzugDown({
    sequelize,
    glob: 'database/migrations/*.js',
    tableName: 'migrations',
    successLabel: 'All migrations rolled back',
    all: true,
  })

const runSeedMigration = async sequelize =>
  runUmzugUp({
    sequelize,
    glob: 'database/seeders/*.js',
    tableName: 'seed_migrations',
    successLabel: 'Seed migrations applied',
  })

const downSeedMigration = async sequelize =>
  runUmzugDown({
    sequelize,
    glob: 'database/seeders/*.js',
    tableName: 'seed_migrations',
    successLabel: 'Seed migrations rolled back',
  })

const downSeedMigrationAll = async sequelize =>
  runUmzugDown({
    sequelize,
    glob: 'database/seeders/*.js',
    tableName: 'seed_migrations',
    successLabel: 'All seed migrations rolled back',
    all: true,
  })

module.exports = {
  runMigrations,
  downMigrations,
  downMigrationsAll,
  runSeedMigration,
  downSeedMigration,
  downSeedMigrationAll,
}
