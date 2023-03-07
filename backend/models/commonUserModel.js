const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commonUserSchema = new Schema({
  fullName:{type:String, required:true},
  email:{type:String, required:true},
  userRole:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model('commonUser',commonUserSchema)