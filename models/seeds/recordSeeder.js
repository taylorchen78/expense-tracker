const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose.js')
const bcrypt = require('bcryptjs')

const initRecords = []

const SEED_USER = {
  name: 'Tony Stark',
  email: 'tony@stark.com',
  password: '1234',
}


function numToStr(num) {
  let numStr = Math.ceil(Math.random() * num).toString()

  if (numStr.length < 2) {
    numStr = '0' + numStr
  }

  return numStr
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length: 10 }, (_, i) =>
        Record.create({
          name: 'name-' + i,
          date: '2020/' + numToStr(12) + '/' + numToStr(28),
          category: Math.floor(Math.random() * 5),
          merchant: Math.random().toString(36).substr(2, 5),
          amount: Math.floor(Math.random() * 1000),
          userId: userId
        })
      ))
    })
    .then(() => {
      console.log('Create record seeds done.')
      process.exit()
    })
})