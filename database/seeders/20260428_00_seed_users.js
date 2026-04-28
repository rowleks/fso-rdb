const bcrypt = require('bcryptjs')

module.exports = {
  up: async ({ context: queryInterface }) => {
    const now = new Date()

    const users = [
      {
        username: 'admin@example.com',
        name: 'Admin User',
        password_hash: await bcrypt.hash('admin123', 10),
        admin: true,
        disabled: false,
        created_at: now,
        updated_at: now,
      },
      {
        username: 'johndoe@example.com',
        name: 'John Doe',
        password_hash: await bcrypt.hash('user123', 10),
        admin: false,
        disabled: false,
        created_at: now,
        updated_at: now,
      },
      {
        username: 'janedoe@example.com',
        name: 'Jane Doe',
        password_hash: await bcrypt.hash('user123', 10),
        admin: false,
        disabled: false,
        created_at: now,
        updated_at: now,
      },
    ]

    await queryInterface.bulkInsert('users', users)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users', {
      username: [
        'admin@example.com',
        'johndoe@example.com',
        'janedoe@example.com',
      ],
    })
  },
}
