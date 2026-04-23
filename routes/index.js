const router = require('express').Router()

router.get('/', (_, res) => {
  res.send('Hello World')
})

router.use('/api/notes', require('./notes.route'))
router.use('/api/blogs', require('./blogs.route'))

module.exports = router
