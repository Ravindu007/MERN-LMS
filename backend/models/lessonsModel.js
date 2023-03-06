const mongoose = require("mongoose")

const Schema = mongoose.Schema

const lessonsSchema = new Schema({
  subjectId:{type:String, required:true},
  lessonName:{type:String, required:true},
  lessonFile:{type:String}
},{timestamps:true})

module.exports = mongoose.model('lesson', lessonsSchema)