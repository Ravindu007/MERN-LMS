const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjectSchema = new Schema({
  subjectName:{type:String, required:true},
  taughtBy:{type:String},
  numberOfStudents:{type:Number, required:true},
  taughtByEmail:{type:String}
}, {timestamps:true})

module.exports = mongoose.model('subject',subjectSchema)