const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const Handlebars = require("handlebars")
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

require('./config/mongoose')

const app = express()

const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: 'ThisIsExpenseTrackerSecret',
  resave: false,
  saveUninitialized: true
}))

// Handlebars.registerHelper("monthSame", function (month, value, options) {
//   console.log('month', month)
//   console.log('value', value)
//   if (month === value) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// })

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.errors_msg = req.flash('errors_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})