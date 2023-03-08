const {admin} = require("../server")
const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET)

const subjectModel = require("../models/subjectModel")
const lessonsModel = require("../models/lessonsModel")
const lmsUserStudentModel = require("../models/lmsUserStudentModel")
const assignmentModel = require("../models/assignmentModel")
const submissionModel = require("../models/submissionModel")


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



// studnet controllers
const getStudentDetails = async(req,res) => {
  try{
    const userEmail = req.query.email
    const relatedUser = await lmsUserStudentModel.find({email:userEmail})
    res.status(200).json(relatedUser)
  }catch(error){
    res.status(400).json(error)
  }
}

//get subjects related to year and department
const getRelatedSubjects = async(req,res) => {
  const {department, academicYear} = req.query

  try{
    const relatedSubjects = await subjectModel.find({ department: department, academicYear: academicYear})
    res.status(200).json(relatedSubjects)
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


const updateLesson = async(req,res) => {
  const {id} = req.params

  try {
    const fetchedLesson = await lessonsModel.findById(id)

    fetchedLesson.lessonName = req.body.lessonName || fetchedLesson.lessonName

    let fileUrl = null

    if(req.file){
      const { originalname, buffer } = req.file;

      const file = bucket.file(`lessons/${originalname}`)

      await file.save(buffer, { contentType: "application/pdf" });

      
      fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      fetchedLesson.lessonFile = fileUrl

      const updatedLesson = await fetchedLesson.save()
      res.status(200).json(updatedLesson)

    }else{
      const updatedLesson = await fetchedLesson.save()
      res.status(200).json(updatedLesson)
    }

  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteLesson = async(req,res) => {
  const {id} = req.params

  try {
    const deletedLesson  = await lessonsModel.findByIdAndDelete({_id:id})
    res.status(200).json(deletedLesson)
  } catch (error) {
    res.status(400).json(error)
  }
}




// assignment controllers

// get all related assignments
const getAllAssignements = async(req,res) => {

  const subjectId = req.query.subjectId
  try{
    const allAssignments = await assignmentModel.find({subjectId:subjectId}).sort({createdAt:-1})
    res.status(200).json(allAssignments)
  }catch(error){
    res.status(400).json(error)
  }
}

const getSingleAssignment = async(req,res) => {
  const {id} = req.params
  try{
    const singleAssignment = await assignmentModel.findById(id)
    res.status(200).json(singleAssignment)
  }catch(error){
    res.status(400).json(error)
  }
}

//create assignment
const createAssignemnt = async(req,res) => {
  const {subjectId, assignmentTitle,deadline} = req.body

  try{
    let fileUrl = null

    if(req.file){
      const {originalname, buffer} = req.file 

      const file = bucket.file(`assignments/${originalname}`)

      await file.save(buffer, {contentType:"application/pdf"})

      fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`

      const createdAssignment = await assignmentModel.create({subjectId, assignmentTitle,deadline, assignmentFile:fileUrl})

      res.status(200).json(createdAssignment)
    }else{
      const createdAssignment = await assignmentModel.create({subjectId, assignmentTitle,deadline, assignmentFile:null})

      res.status(200).json(createdAssignment)
    }
  }catch(error){
    res.status(400).json(error)
  }
}


const updateAssignment = async(req,res) => {
  const {id} = req.params

  try{
    const assignemnt = await assignmentModel.findById(id)

    // update properties
    assignemnt.subjectId = req.body.subjectId || assignemnt.subjectId
    assignemnt.assignmentTitle = req.body.assignmentTitle || assignemnt.assignmentTitle
    assignemnt.deadline = req.body.deadline || assignemnt.deadline

    let fileUrl = null

    if(req.file){
      const { originalname, buffer } = req.file;

      const file = bucket.file(`assignments/${originalname}`)

      await file.save(buffer, { contentType: "application/pdf" });

      
      fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      assignemnt.assignmentFile = fileUrl

      const updatedAssignment = await assignemnt.save()
      res.status(200).json(updatedAssignment)

    }else{
      const updatedAssignment = await assignemnt.save()
      res.status(200).json(updatedAssignment)
    }
  }catch(error){
    res.status(400).json(error)
  }
}

const deleteAssignment = async(req,res) => {
  const {id} = req.params

  try{
    const deletedAssignment = await assignmentModel.findByIdAndDelete({_id:id})
    res.status(200).json(deletedAssignment)
  }catch(error){
    res.status(400).json(error)
  }
}



// responses in teacher view
const getAllRelatedSubmissions = async(req,res) => {
  const assignmentId = req.query.assignmentId
  try{
    const allRelatedSubmissions = await submissionModel.find({assignmentId:assignmentId}).sort({createdAt:-1})
    res.status(200).json(allRelatedSubmissions)
  }catch(error){
    res.status(400).json(error)
  }
}


// create response in student view
const createAssignmentSubmission = async(req,res) => {
  const {assignmentId, registrationNumber} = req.body

  try{
    let fileUrl = null

    if(req.file){
      const {originalname, buffer} = req.file 

      const file = bucket.file(`submissions/${originalname}`)

      await file.save(buffer, {contentType:"application/pdf"})

      fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`

      const createdSubmission = await submissionModel.create({assignmentId, registrationNumber, submissionFile:fileUrl})

      res.status(200).json(createdSubmission)
    }else{
      const createdAssignment = await assignmentModel.create({assignmentId, registrationNumber, submissionFile:null})

      res.status(200).json(createdAssignment)
    }
  }catch(error){
    res.status(400).json(error)
  }
}

module.exports = {getSingleSubjectByEmail, getSingleSubject,getAllRelatedLessons,createLesson, updateLesson,deleteLesson,getStudentDetails,getRelatedSubjects,getAllAssignements,getSingleAssignment, createAssignemnt, updateAssignment, deleteAssignment,getAllRelatedSubmissions,createAssignmentSubmission}