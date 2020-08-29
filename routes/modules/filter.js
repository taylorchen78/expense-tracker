const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.post('/', (req, res) => {
  const userId = req.user._id
  const selectMonth = req.body.month

  const filter = { userId }
  if (req.body.month.length !== 0) filter.date = { $regex: req.body.month }
  if (req.body.category.length !== 0) filter.category = Number(req.body.category)

  const getCatogory = new Promise((resolve, reject) => {
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        const categoryList = []
        categories.forEach(category => {
          categoryList.push({ name: category.name, icon: category.icon })
        })
        return resolve(categoryList)
      })
  })

  const getMonth = new Promise((resolve, reject) => {
    Record.find({ userId })
      .lean()
      .then(records => {
        const months = []
        records.forEach(record => {
          const month = record.date.substr(0, 7) //ex: 2020/08
          if (!months.includes(month)) {
            months.push(month)
          }
        })
        return resolve(months)
      })
  })

  Promise.all([getCatogory, getMonth])
    .then(data => {
      const [categoryList, months] = data

      Record.find(filter)
        .lean()
        .then(records => {
          let totalAmount = 0
          if (records.length !== 0) {
            totalAmount = records.map(record => record.amount).reduce((a, b) => a + b)
          }

          records.forEach(record => {
            record.icon = categoryList[record.category].icon
          })

          if (filter.category !== undefined) categoryList[filter.category].isSame = true

          res.render('index', { records, categoryList, totalAmount, months, selectMonth })
        })
        .catch(error => console.error(error))
    })
})

module.exports = router