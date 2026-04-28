module.exports = {
  up: async ({ context: queryInterface }) => {
    const blogUpdates = [
      { title: 'A Complete Guide to useEffect', year: 2019 },
      { title: 'Making setInterval Declarative with React Hooks', year: 2019 },
      { title: 'The Cost of JavaScript in 2026', year: 2026 },
      { title: 'Image Optimization for the Web', year: 2021 },
      { title: 'Microservices', year: 2014 },
      { title: 'Feature Toggles', year: 2017 },
      { title: 'Stop Using IsLoading Booleans', year: 2020 },
      { title: 'Static and Dynamic Rendering in Next.js', year: 2023 },
      { title: 'Get Ready for ESM', year: 2021 },
      { title: 'Accessible SVGs', year: 2019 },
    ]

    for (const update of blogUpdates) {
      await queryInterface.bulkUpdate(
        'blogs',
        { year: update.year },
        { title: update.title }
      )
    }

    // Default year for any other existing records that were not part of the seed
    await queryInterface.bulkUpdate('blogs', { year: 2024 }, { year: null })
  },
  down: async ({ context: queryInterface }) => {
    // Rollback sets the year back to null for all records
    await queryInterface.bulkUpdate('blogs', { year: null })
  },
}
