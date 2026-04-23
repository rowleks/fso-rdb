require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { sequelize, connectDB } = require('./database')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/', require('./routes'))

const start = async () => {
  try {
    await connectDB()
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
