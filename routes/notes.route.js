const Note = require('../database/schema/notes.schema')

const router = require('express').Router()

router.get('/', async (_, res) => {
  try {
    const notes = await Note.findAll()

    res.json(notes)
  } catch (err) {
    res.status(500).send(`Error fetching notes: ${err}`)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(`Error fetching note: ${err}`)
  }
})

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      note.important = req.body.important
      await note.save()
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).send(`Error updating note: ${err}`)
  }
})

module.exports = router
