const Note = require('../database/schema/notes.schema')

const router = require('express').Router()

router.get('/', async (_, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

router.get('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const newNote = await Note.create({
    ...req.body,
    date: new Date(),
  })

  res.json(newNote)
})

router.put('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

module.exports = router
