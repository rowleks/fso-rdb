const router = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const { User } = require('../database/schema')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: { username },
  })

  const loginCorrect = user && password === 'secret'

  if (!loginCorrect) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: '1hr',
  })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
