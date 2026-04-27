const router = require('express').Router()
const { Blog, User } = require('../database/schema')

router.post('/', async (_, res) => {
  await Blog.destroy({ truncate: true, restartIdentity: true, cascade: true })
  await User.destroy({ truncate: true, restartIdentity: true, cascade: true })
  return res.status(204).end()
})

module.exports = router
