const { User, Blog, Readlist } = require('../database/schema')
const { verifyToken } = require('../utils/middleware')

const router = require('express').Router()

router.get('/:userId', async (req, res) => {
  const user = await User.findByPk(req.params.userId, {
    include: {
      model: Blog,
      as: 'readings',
      through: { attributes: [] },
    },
  })
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  res.json(user.readings)
})

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body
  if (!blogId || !userId) {
    return res.status(400).json({ error: 'blogId and userId are required' })
  }

  const blog = await Blog.findByPk(blogId)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  try {
    const readlist = await Readlist.create({
      userId,
      blogId,
    })
    res.status(201).json({
      id: readlist.id,
      user_id: readlist.userId,
      blog_id: readlist.blogId,
      read: readlist.read,
    })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'blog already in readlist' })
    }
    throw err
  }
})

router.delete('/:blogId', verifyToken, async (req, res) => {
  const { userId } = req.body
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' })
  }

  if (req.user.id !== userId && !req.user.admin) {
    return res.status(403).json({ error: 'unauthorized' })
  }

  const deleted = await Readlist.destroy({
    where: {
      userId,
      blogId: req.params.blogId,
    },
  })
  if (!deleted) {
    return res.status(404).json({ error: 'blog not found in readlist' })
  }
  res.status(204).end()
})

router.put('/:id', verifyToken, async (req, res) => {
  const { read } = req.body

  if (read === undefined || typeof read !== 'boolean') {
    return res.status(400).json({ error: 'read must be a true or false' })
  }

  const readlist = await Readlist.findByPk(req.params.id)
  if (!readlist) {
    return res.status(404).json({ error: 'blog not found in readlist' })
  }

  if (req.user.id !== readlist.userId && !req.user.admin) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  readlist.set({ read })
  await readlist.save()

  res.json(readlist)
})

module.exports = router
