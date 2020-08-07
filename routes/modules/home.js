const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const categoryList = []

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categories.forEach(category => {
        categoryList.push({ name: category.name })
      })
    })
    .catch(error => console.error(error))

  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      if (records.length !== 0) {
        totalAmount = records.map(record => record.amount).reduce((a, b) => a + b)
      }
      res.render('index', { records, categoryList, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router