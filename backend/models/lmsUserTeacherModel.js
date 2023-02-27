const mongoose = require("mongoose")

const Schema = mongoose.Schema

const lmsUserTeacherSchema = new Schema({
  fullName:{type:String, required:true},
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
  email:{type:String, required:true},
  phoneNumber:{type:String, required:true},
  userRole:{type:String, required:true},
  department:{type:String, required:true},
  subject:{type:String, required:true},
  teacherImage:{type:String}
},{timestamps:true})

module.exports = mongoose.model('teacher', lmsUserTeacherSchema)