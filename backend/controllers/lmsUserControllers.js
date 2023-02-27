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

const getSingleTeacherUser = async(req,res) => {
  const {id} = req.params

  try {
    const singleTeacherUser = await lmsUserTeacherModel.findById(id)

    if(!singleTeacherUser){
      res.status(404).json("There is no such doc")
    }

    res.status(200).json(singleTeacherUser)
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

const updateTeacherUsers = async(req,res)=>{
  const {id} = req.params

  try {
    const updatedTeacherUser = await lmsUserTeacherModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})

    if(!updatedTeacherUser){
      res.status(404).json("There is no such doc")
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteTeacherUsers = async(req,res)=>{
  const {id} = req.params

  try {
    const deletedTeacherUser = await lmsUserTeacherModel.findByIdAndDelete(id)

    if(!deletedTeacherUser){
      res.status(404).json("There is no such doc")
    }
    res.status(200).json(deletedTeacherUser)

  } catch (error) {
    res.status(200).json(error)
  }
}

module.exports = {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers}