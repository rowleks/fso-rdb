const router = require('express').Router()
const { Session } = require('../database/schema')
const { verifyToken } = require('../utils/middleware')

router.delete('/', verifyToken, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.user.id,
    },
  })

  res.status(204).end()
})

module.exports = router
