require('dotenv').config()
const { sequelize } = require('./database')

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: sequelize.QueryTypes.SELECT,
    })
    for (const blog of blogs) {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    }
    process.exit(0)
  } catch (err) {
    console.error('DB connection failed:', err)
  }
}

main()
