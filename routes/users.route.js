const router = require('express').Router()
const { User, Blog } = require('../database/schema')

router.get('/', async (_, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    ],
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    ],
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)

  res.status(201).json(user)
})

module.exports = router
