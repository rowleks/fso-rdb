const User = require('./users.schema')
const Note = require('./notes.schema')
const Blog = require('./blogs.schema')

/* A User can have many Notes.
The foreignKey 'userId' on the Note model points back to the User's id. */
User.hasMany(Note)

/* A Note belongs to one User.
The foreign key 'userId' is on the Note model. */
Note.belongsTo(User)

module.exports = {
  User,
  Note,
  Blog,
}
