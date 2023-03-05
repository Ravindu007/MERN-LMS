const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true}
})


//static signup method
userSchema.statics.signup = async function(email,password) {

  // validations
  if(!email || !password){
    throw Error("Both Email & password should be provided")
  }

  if(!validator.isEmail(email)){
    throw Error("Email is invalid")
  }

  if(!validator.isStrongPassword(password)){
    throw Error("Password is not strong enough")
  }

  //echeck whether the email is exists 
  const exists = await this.findOne({email})

  if(exists){
    throw Error("This Email already in use")
  }

  //hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  //create user in the database
  const user = await this.create({email, password:hashedPassword})

  return user;
}

//static login method
userSchema.statics.login = async function(email,password){
  //validations
  if(!email || !password){
    throw Error("Both Email and password should be provided")
  }

  //check wether a user exists for that email
  const user = await this.findOne({email})

  if(!user){
    throw Error("Incorrect Email")
  }

  //if user exists match password
  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error("Incorrect Password")
  }

  return user
}

module.exports = mongoose.model('user',userSchema)