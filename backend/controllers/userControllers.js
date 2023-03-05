const jwt = require("jsonwebtoken")

const userModel = require("../models/userModel")


//create token 
const createToken = (_id) => {
  return jwt.sign({_id:_id}, process.env.SECRET,{expiresIn:'3d'})
}

const loginUser = async(req,res) => {
  const {email, password} = req.body

  try {
    const user = await userModel.login(email, password)

    //create token
    const token = createToken(user._id)
    res.status(200).json({email, token})


  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

const signupUser = async(req,res) => {
  const {email, password} = req.body 

  try{
    const user = await userModel.signup(email, password)

    // create token after signup the user 
    const token = createToken(user._id)
    //retun token and email
    res.status(200).json({email, token})
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

module.exports = {loginUser, signupUser}