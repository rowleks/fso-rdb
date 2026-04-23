require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./database')
const Note = require('./database/schema/notes.schema')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.get('/api/notes', async (_, res) => {
  try {
    const notes = await Note.findAll()

    res.json(notes)
  } catch (err) {
    res.status(500).send(`Error fetching notes: ${err}`)
  }
})

app.post('/api/notes', async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      date: new Date(),
    })

    res.json(newNote)
  } catch (err) {
    res.status(400).send(`Error creating note: ${err}`)
  }
})

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
