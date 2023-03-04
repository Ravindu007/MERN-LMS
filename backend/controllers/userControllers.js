const loginUser = async(req,res) => {
  res.json({msg:'user logged in'})
}

const signupUser = async(req,res) => {
  res.json({msg:'user signed up'})
}

module.exports = {loginUser, signupUser}