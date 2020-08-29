const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const categoryList = []
  const userId = req.user._id

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categories.forEach(category => {
        categoryList.push({ name: category.name, icon: category.icon })
      })
    })
    .then(() => {
      Record.find({ userId })
        .lean()
        .then(records => {
          let totalAmount = 0
          const months = []

          if (records.length !== 0) {
            totalAmount = records.map(record => record.amount).reduce((a, b) => a + b)
          }

          records.forEach(record => {
            record.icon = categoryList[record.category].icon
            const month = record.date.substr(0, 7) //ex: 2020/08
            if (!months.includes(month)) {
              months.push(month)
            }
          })

          months.sort()

          res.render('index', { records, categoryList, totalAmount, months })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router