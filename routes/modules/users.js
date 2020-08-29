const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors_msg = []

  if (password !== confirmPassword) {
    errors_msg.push('Password inconsistent！')
    return res.render('register', { errors_msg, name, email, password, confirmPassword })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors_msg.push('User already exists!')
      res.render('register', { errors_msg, name, email, password, confirmPassword })
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout success!')
  res.redirect('/users/login')
})

module.exports = router