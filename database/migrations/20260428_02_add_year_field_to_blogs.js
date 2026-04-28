const { DataTypes, Op } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
    })

    await queryInterface.addConstraint('blogs', {
      fields: ['year'],
      type: 'check',
      where: {
        year: {
          [Op.gte]: 1991,
          [Op.lte]: new Date().getFullYear(),
        },
      },
      name: 'blogs_year_check',
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
