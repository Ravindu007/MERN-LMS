const mongoose = require("mongoose")

const Schema = mongoose.Schema

const assignmentSchema = new Schema({
  subjectId:{type:String,required:true},
  academicYear:{type:String, required:true},
  department:{type:String, required:true},
  assignmentTitle:{type:String, required:true},
  deadline:{type:Date, required:true},
  assignmentFile:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model('assignment', assignmentSchema)