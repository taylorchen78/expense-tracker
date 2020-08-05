const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require("handlebars")

require('./config/mongoose')

const app = express()

const port = 3000

Handlebars.registerHelper("categorySame", function (category, value, options) {
  if (category === value) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

const Record = require('./models/record')
const Category = require('./models/category')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})

app.get('/records/:id/edit', (req, res) => {
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
      console.log(categoryList)
      res.render('edit', { record, categoryList })
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})