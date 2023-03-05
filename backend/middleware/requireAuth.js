const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const requireAuth = async(req,res,next) =>{
  //check the headers
  const {authorization} = req.headers  //this contains email and token

  if(!authorization){
    res.status(400).json({error:"Authorization token requires"})
  }

  //grab the token from the headers
  const token = authorization.split(" ")[1]
  const userEmail = authorization.split(" ")[0]
  // verify the token
  try{
    //grab the id from the token
    const {_id} = jwt.verify(token, process.env.SECRET)

    //by using the id we want to find the user in the database
    req.user = await userModel.findOne({_id}).select('_id') //only set _id as req.user
    req.userEmail = userEmail
    next()
  }catch(error){
    res.status(400).json({error:"Request not authorized"})
  }


}

module.exports = requireAuth