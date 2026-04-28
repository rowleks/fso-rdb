const express = require('express')
const cors = require('cors')
const { connectDB } = require('./database')
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

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
