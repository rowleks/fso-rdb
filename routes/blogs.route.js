const { Op } = require('sequelize')
const { Blog, User } = require('../database/schema')
const { verifyToken } = require('../utils/middleware')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ]
  }

  const blogs = await Blog.findAll({
    where,
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', verifyToken, async (req, res) => {
  const newBlog = await Blog.create({
    ...req.body,
    userId: req.user.id,
  })
  res.json(newBlog)
})

router.put('/:id', verifyToken, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    // Use .set() and .save() to trigger validations and maintain the instance logic
    blog.set(req.body)
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blog.userId !== req.user.id) {
    return res.status(403).json({ error: 'unauthorized' })
  }

  await blog.destroy()
  return res.status(204).end()
})

module.exports = router
