const router = require('express').Router()

router.get('/', (_, res) => {
  res.send('Hello World')
})

router.use('/api/blogs', require('./blogs.route'))
router.use('/api/login', require('./login.route'))
router.use('/api/users', require('./users.route'))

module.exports = router
