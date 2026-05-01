const jwt = require('jsonwebtoken')
const config = require('./config')
const { Session, User } = require('../database/schema')

const unknownEndpoint = (_, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, _, res, _next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: err.errors?.map(error => error.message) || 'validation error',
    })
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: 'database error' })
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: err.errors?.map(error => error.message) || 'duplicate value',
    })
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  console.error(err)
  return res.status(500).json({ error: 'internal server error' })
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ error: 'missing token' })

  try {
    const user = jwt.verify(token, config.JWT_SECRET)
    const session = await Session.findOne({
      where: { token },
      include: {
        model: User,
      },
    })

    if (!session || session.userId !== user.id) {
      return res.status(401).json({ error: 'invalid token' })
    }

    if (session.expiresAt && session.expiresAt < new Date()) {
      await session.destroy()
      return res.status(401).json({ error: 'expired session' })
    }

    if (session.user.disabled) {
      return res.status(401).json({ error: 'account disabled' })
    }

    req.user = user
    req.session = session
    next()
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  verifyToken,
}
