const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjectSchema = new Schema({
  subjectName:{type:String, required:true},
  taughtBy:{type:String, required:true},
  numberOfStudents:{type:Number, required:true}
}, {timestamps:true})

module.exports = mongoose.model('subject',subjectSchema)