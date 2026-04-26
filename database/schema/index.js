const User = require('./users.schema')
const Blog = require('./blogs.schema')

/* A User can have many Notes.
The foreignKey 'userId' on the Note model points back to the User's id. */
User.hasMany(Blog)

/* A Note belongs to one User.
The foreign key 'userId' is on the Note model. */
Blog.belongsTo(User)

module.exports = {
  User,
  Blog,
}
