const router = require('express').Router()
const bcrypt = require('bcryptjs')
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
  const readQuery = req.query.read

  if (
    readQuery !== undefined &&
    readQuery !== 'true' &&
    readQuery !== 'false'
  ) {
    return res.status(400).json({
      error: "read query parameter must be 'true' or 'false'",
    })
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog,
        as: 'readings',
        through: {
          as: 'reading_list',
          attributes: ['id', 'read'],
          where: readQuery == undefined ? undefined : { read: readQuery },
        },
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
  const { password, ...userData } = req.body
  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'Password must be at least 3 characters long',
    })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    ...userData,
    passwordHash,
  })

  const { passwordHash: _, ...safeUser } = user.toJSON()
  res.status(201).json(safeUser)
})

module.exports = router
