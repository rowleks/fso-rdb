const router = require('express').Router()
const { Blog, User } = require('../database/schema')

router.post('/', async (_, res) => {
  await Blog.destroy({ where: {}, truncate: true, restartIdentity: true })
  await User.destroy({ where: {}, truncate: true, restartIdentity: true })
  return res.status(204).end()
})

module.exports = router
