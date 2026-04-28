const {
  connectDB,
  runMigrations,
  downMigrations,
  downMigrationsAll,
  runSeedMigration,
  downSeedMigration,
  downSeedMigrationAll,
  sequelize,
} = require('.')

const command = process.argv[2]

const commands = {
  up: runMigrations,
  down: downMigrationsAll,
  'down:one': downMigrations,
  'seed:up': runSeedMigration,
  'seed:down': downSeedMigrationAll,
  'seed:down:one': downSeedMigration,
}

const run = async () => {
  if (!commands[command]) {
    console.error(
      'Invalid command. Use one of: up, down, down:one, seed:up, seed:down, seed:down:one'
    )
    process.exit(1)
  }

  try {
    await connectDB()
    await commands[command]()
    process.exit(0)
  } catch (err) {
    console.error('Migration command failed:', err)
    process.exit(1)
  } finally {
    await sequelize.close()
  }
}

run()
