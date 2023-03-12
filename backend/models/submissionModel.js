const mongoose = require("mongoose")

const Schema = mongoose.Schema

const submissionSchema = new Schema({
  assignmentId:{type:String, required:true},
  registrationNumber:{type:String, required:true},
  studentEmail:{type:String,required:true},
  submissionFile:{type:String, required:true},
  marks:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model('submission',submissionSchema)