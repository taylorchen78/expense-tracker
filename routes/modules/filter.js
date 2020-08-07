const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.post('/', (req, res) => {
  const selectCategory = Number(req.body.category)

  if (selectCategory === -1) {
    res.redirect('/')
  } else {
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

    Record.find({ category: selectCategory })
      .lean()
      .then(records => {
        let totalAmount = 0
        if (records.length !== 0) {
          totalAmount = records.map(record => record.amount).reduce((a, b) => a + b)
        }
        categoryList[selectCategory].isSame = true
        res.render('index', { records, categoryList, totalAmount })
      })
      .catch(error => console.error(error))
  }
})

module.exports = router