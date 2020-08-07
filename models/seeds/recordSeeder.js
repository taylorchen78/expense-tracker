const Record = require('../record')
const db = require('../../config/mongoose.js')

const initRecords = []

function numToStr(num) {
  let numStr = Math.ceil(Math.random() * num).toString()

  if (numStr.length < 2) {
    numStr = '0' + numStr
  }

  return numStr
}

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    initRecords.push({
      name: 'name-' + i,
      date: '2020/' + numToStr(12) + '/' + numToStr(28),
      category: Math.floor(Math.random() * 5),
      amount: Math.floor(Math.random() * 1000)
    })
  }

  Record.insertMany(initRecords)
    .then(() => {
      console.log('Records are created')
      db.close()
    })
    .catch(error => console.error(error))
})