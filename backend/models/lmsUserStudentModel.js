const mongoose = require("mongoose")

const Schema = mongoose.Schema

const lmsUserStudentSchema = new Schema({
  fullName:{type:String, required:true},
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
  registrationNumber:{type:String, required:true},
  email:{type:String, required:true},
  department:{type:String, required:true},
  academicYear:{type:String, required:true},
  studentImage:{type:String}
},{timestamps:true})

module.exports = mongoose.model('student', lmsUserStudentSchema)