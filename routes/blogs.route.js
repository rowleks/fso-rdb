const Blog = require('../database/schema/blogs.schema')

const router = require('express').Router()

router.get('/', async (_, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (err) {
    res.status(500).send(`Error fetching blogs: ${err}`)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).send(`Error fetching blog: ${err}`)
  }
})

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    res.json(newBlog)
  } catch (err) {
    res.status(400).send(`Error creating blog: ${err}`)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      // Use .set() and .save() to trigger validations and maintain the instance logic
      blog.set(req.body)
      await blog.save()
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).send(`Error updating blog: ${err}`)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).send('Blog not found')
    }
    await blog.destroy()
    res.status(204).end()
  } catch (err) {
    res.status(400).send(`Error deleting blog: ${err}`)
  }
})

module.exports = router
