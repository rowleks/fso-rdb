const Blog = require('../database/schema/blogs.schema')

const router = require('express').Router()

router.get('/', async (_, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const newBlog = await Blog.create(req.body)
  res.json(newBlog)
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  await blog.destroy()
  return res.status(204).end()
})

module.exports = router
