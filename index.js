require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { runMigrations, runSeedMigration, connectDB } = require('./database')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const app = express()
const PORT = config.PORT

app.use(express.json())
app.use(cors())

app.use('/', require('./routes'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async () => {
  try {
    await connectDB()
    await runMigrations()
    await runSeedMigration()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
