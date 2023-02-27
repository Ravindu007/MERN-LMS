//models
const lmsUserTeacherModel = require("../models/lmsUserTeacherModel")

//teacher users 
const getAllTeacherUsers = async(req,res)=>{
  try {
    const allTeacherUsers = await lmsUserTeacherModel.find({}).sort({createdAt:-1})
    res.status(200).json(allTeacherUsers)
  } catch (error) {
    res.status(400).json(error)
  }
}

const createTeacherUser = async(req,res)=>{
  const {fullName,
         firstName,
         lastName,
         email,
         phoneNumber,
         userRole,
         department,
         subject
        } = req.body

  try {
    const createTeacher = await lmsUserTeacherModel.create({
      fullName,
      firstName,
      lastName,
      email,
      phoneNumber,
      userRole,
      department,
      subject
    })
  
    res.status(200).json(createTeacher)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateTeacherUsers = async(req,res)=>{}

const deleteTeacherUsers = async(req,res)=>{}

module.exports = {createTeacherUser, getAllTeacherUsers, updateTeacherUsers, deleteTeacherUsers}