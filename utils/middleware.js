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

  console.error(err)
  return res.status(500).json({ error: 'internal server error' })
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
