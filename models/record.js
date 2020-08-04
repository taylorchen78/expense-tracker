const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: true
  },
  category: {
    type: Number,
    default: true
  },
  amount: {
    type: Number,
    default: true
  }
})

module.exports = mongoose.model('Record', recordSchema)