const User = require('./users.schema')
const Blog = require('./blogs.schema')
const Readlist = require('./readlists.schema')

/* A User can have many Notes.
The foreignKey 'userId' on the Note model points back to the User's id. */
User.hasMany(Blog)

/* A Note belongs to one User.
The foreign key 'userId' is on the Note model. */
Blog.belongsTo(User)

/* A User can save many Blogs to their readlist. */
User.belongsToMany(Blog, { through: Readlist, as: 'readings' })

/* A Blog can be saved by many Users. */
Blog.belongsToMany(User, { through: Readlist, as: 'savedByUsers' })

module.exports = {
  User,
  Blog,
  Readlist,
}
