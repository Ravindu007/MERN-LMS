//models
const subjectModel = require("../models/subjectModel")


const getAllSubjects = async(req,res) => {
  try {
    const allSubjects  = await subjectModel.find({}).sort({createdAt:-1})
    res.status(200).json(allSubjects)
  } catch (error) {
    res.status(400).json(error)
  }
}


const getSingleSubject = async(req,res) => {

  const {id} = req.params
  try{
    const singleSubject = await subjectModel.findById(id)
    res.status(200).json(singleSubject)
  }catch(error){
    res.status(400).json(error)
  }
  
}

const createSubject = async(req,res) => {
  const {subjectName, taughtBy, numberOfStudents} = req.body

  try {
    const subject = await subjectModel.create({subjectName, taughtBy, numberOfStudents})
    res.status(200).json(subject)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateSubject = async(req,res) => {
  const {id} = req.params

  try{
    const updatedSubject = await subjectModel.findByIdAndUpdate({_id:id}, {...req.body},{new:true})
    res.status(200).json(updatedSubject)
  }catch(error){
    res.status(400).json(error)
  }
}

const deleteSubject = async(req,res) => {
  const {id} = req.params
  try {
    const deletedSubject = await subjectModel.findByIdAndDelete({_id:id})
    res.status(200).json(deletedSubject)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getAllSubjects, getSingleSubject, createSubject, updateSubject, deleteSubject
}