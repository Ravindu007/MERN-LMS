const {admin} = require("../server")
const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET)

const subjectModel = require("../models/subjectModel")

// get a  related subject using the user id
const getSingleSubjectByEmail = async(req,res) => {

  const userEmail = req.userEmail
  try{
    const singleSubject = await subjectModel.find({taughtByEmail:userEmail})
    res.status(200).json(singleSubject)
  }catch(error){
    res.status(400).json(error)
  }
  
}

module.exports = {getSingleSubjectByEmail}