const { QueryTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    const seededUsernames = [
      'admin@example.com',
      'johndoe@example.com',
      'janedoe@example.com',
    ]

    const insertedUsers = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE username IN (:usernames)`,
      {
        replacements: { usernames: seededUsernames },
        type: QueryTypes.SELECT,
      }
    )

    const userIds = insertedUsers.map(user => user.id)
    const pickRandomUserId = () =>
      userIds[Math.floor(Math.random() * userIds.length)]

    const blogs = [
      {
        author: 'Dan Abramov',
        title: 'A Complete Guide to useEffect',
        url: 'https://overreacted.io/a-complete-guide-to-useeffect/',
        likes: 250,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Dan Abramov',
        title: 'Making setInterval Declarative with React Hooks',
        url: 'https://overreacted.io/making-setinterval-declarative-with-react-hooks/',
        likes: 180,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Addy Osmani',
        title: 'The Cost of JavaScript in 2026',
        url: 'https://addyosmani.com/blog/cost-of-javascript-2026/',
        likes: 210,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Addy Osmani',
        title: 'Image Optimization for the Web',
        url: 'https://addyosmani.com/blog/image-optimization/',
        likes: 160,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Martin Fowler',
        title: 'Microservices',
        url: 'https://martinfowler.com/articles/microservices.html',
        likes: 300,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Martin Fowler',
        title: 'Feature Toggles',
        url: 'https://martinfowler.com/articles/feature-toggles.html',
        likes: 190,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Kent C. Dodds',
        title: 'Stop Using IsLoading Booleans',
        url: 'https://kentcdodds.com/blog/stop-using-isloading-booleans',
        likes: 145,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Guillermo Rauch',
        title: 'Static and Dynamic Rendering in Next.js',
        url: 'https://vercel.com/blog/static-and-dynamic-rendering-in-next-js',
        likes: 175,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Sindre Sorhus',
        title: 'Get Ready for ESM',
        url: 'https://sindresorhus.com/blog/get-ready-for-esm',
        likes: 130,
        user_id: pickRandomUserId(),
      },
      {
        author: 'Sara Soueidan',
        title: 'Accessible SVGs',
        url: 'https://www.sarasoueidan.com/blog/accessible-svgs/',
        likes: 155,
        user_id: pickRandomUserId(),
      },
    ]

    await queryInterface.bulkInsert('blogs', blogs)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('blogs', {
      url: [
        'https://overreacted.io/a-complete-guide-to-useeffect/',
        'https://overreacted.io/making-setinterval-declarative-with-react-hooks/',
        'https://addyosmani.com/blog/cost-of-javascript-2026/',
        'https://addyosmani.com/blog/image-optimization/',
        'https://martinfowler.com/articles/microservices.html',
        'https://martinfowler.com/articles/feature-toggles.html',
        'https://kentcdodds.com/blog/stop-using-isloading-booleans',
        'https://vercel.com/blog/static-and-dynamic-rendering-in-next-js',
        'https://sindresorhus.com/blog/get-ready-for-esm',
        'https://www.sarasoueidan.com/blog/accessible-svgs/',
      ],
    })
  },
}
