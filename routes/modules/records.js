const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/create', (req, res) => {
  const categoryList = []
  const today = new Date().toJSON().slice(0, 10)

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categories.forEach(category => {
        categoryList.push({ name: category.name })
      })
      res.render('new', { categoryList, today })
    })
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const inputData = req.body
  inputData["userId"] = req.user._id

  Record.create(inputData)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categoryList = []

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categories.forEach(category => {
        categoryList.push({ name: category.name })
      })
    })
    .then(() => {
      Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          record.date = record.date.split('/').join('-')
          categoryList[record.category].isSame = true
          res.render('edit', { record, categoryList })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

module.exports = router