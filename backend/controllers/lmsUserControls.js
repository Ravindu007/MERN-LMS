

const subjectModel = require("../models/subjectModel")
const lessonsModel = require("../models/lessonsModel")


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

const getSingleSubject = async(req,res) => {

  const {id} = req.params
  try{
    const singleSubject = await subjectModel.findById(id)
    res.status(200).json(singleSubject)
  }catch(error){
    res.status(400).json(error)
  }
  
}

//get all related lessons
const getAllRelatedLessons = async(req, res) => {
  try{
    const subjectId = req.query.id;

    const allRelatedLessons = await lessonsModel.find({subjectId:subjectId}).sort({createdAt:-1})
    res.status(200).json(allRelatedLessons)
  }catch(error){
    res.status(400).json(error)
  }
}

const {admin} = require("../server")
const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET)
//create a lesson
const createLesson = async(req,res) => {
  const {subjectId, lessonName} = req.body

  try {
    let fileUrl = null

    if(req.file){
      const { originalname, buffer } = req.file;

      const file = bucket.file(`lessons/${originalname}`)

      await file.save(buffer, { contentType: "application/pdf" });

      
      fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      const createdLesson = await lessonsModel.create({subjectId, lessonName, lessonFile:fileUrl})
      
      res.status(200).json(createdLesson)

    }else{
      const createdLesson = await lessonsModel.create({subjectId, lessonName, lessonFile:null})
      res.status(200).json(createdLesson)
    }

  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {getSingleSubjectByEmail, getSingleSubject,getAllRelatedLessons,createLesson}