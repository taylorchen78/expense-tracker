const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('errors_msg', 'Email not registered!'))
        }

        return bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, req.flash('errors_msg', 'Password not correct!'))
          }
        })
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}