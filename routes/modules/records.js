const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
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

  Record.findById(id)
    .lean()
    .then(record => {
      record.date = record.date.split('/').join('-')
      categoryList[record.category].isSame = true
      res.render('edit', { record, categoryList })
    })
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

module.exports = router