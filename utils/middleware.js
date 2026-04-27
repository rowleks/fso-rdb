const jwt = require('jsonwebtoken')
const config = require('./config')

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

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ error: 'missing token' })

  try {
    const user = jwt.verify(token, config.JWT_SECRET)
    req.user = user
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
