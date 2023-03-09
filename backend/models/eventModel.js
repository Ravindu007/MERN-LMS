const mongoose = require("mongoose")

const Schema = mongoose.Schema

// event or notice
const eventSchema = new Schema({
  eventName:{type:String, required:true},
  eventDetails:{type:String, required:true},
  eventImage:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model('event', eventSchema)