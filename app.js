const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require("handlebars")
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()

const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Handlebars.registerHelper("monthSame", function (month, value, options) {
//   console.log('month', month)
//   console.log('value', value)
//   if (month === value) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// })

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})