const router = require('express').Router()
const sequelize = require('sequelize')
const { Blog } = require('../database/schema')

router.get('/', async (_, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      [sequelize.fn('Count', sequelize.col('id')), 'articles'],
    ],
    group: ['author'],
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
  })

  res.json(authors)
})

router.get('/:id', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      [sequelize.fn('Count', sequelize.col('id')), 'articles'],
    ],
    where: {
      userId: req.params.id,
    },
    group: ['author'],
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
  })
  return res.json(authors)
})

module.exports = router
