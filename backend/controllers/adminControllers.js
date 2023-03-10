const {admin} = require("../server")

const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET)


//models
const lmsUserTeacherModel = require("../models/lmsUserTeacherModel")
const lmsUserStudentModel = require("../models/lmsUserStudentModel")
const commonUserModel = require("../models/commonUserModel")



//common users
const getAllCommonUsers = async(req,res) => {
  try {
    const allCommonUsers = await commonUserModel.find({}).sort({createdAt:-1})
    res.status(200).json(allCommonUsers)
  } catch (error) {
    res.status(400).json(error)
  }
}


const fetchUserRole = async(req,res) => {
  try {
    const userEmail = req.query.userEmail
    const allCommonUsers = await commonUserModel.find({email:userEmail}).sort({createdAt:-1})
    res.status(200).json(allCommonUsers)
  } catch (error) {
    res.status(400).json(error)
  }
}


const createCommonUser = async(req,res)=>{
  const {fullName, email, userRole} = req.body

  try {
    const createdCommonUser = await commonUserModel.create({fullName, email, userRole})
    res.status(200).json(createdCommonUser)
  } catch (error) {
   res.status(400).json(error) 
  }
}




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
    let imageUrl = null 
    
    if(req.file){
      const fileName = req.file.originalname 
      const file  = bucket.file(fileName)
      
      const stream = file.createWriteStream({
        metadata:{
          contentType:req.file.mimetype
        }
      })

      stream.on("error",(err)=>{
        console.error(err);
      })

      stream.on("finish",async()=>{
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const createTeacher = await lmsUserTeacherModel.create({
          fullName,
          firstName,
          lastName,
          email,
          phoneNumber,
          userRole,
          department,
          subject,
          teacherImage:imageUrl
        })
        res.status(200).json(createTeacher)
      })
      stream.end(req.file.buffer)
    }else{
      const createTeacher = await lmsUserTeacherModel.create({
        fullName,
        firstName,
        lastName,
        email,
        phoneNumber,
        userRole,
        department,
        subject,
        teacherImage:null
      })
    
      res.status(200).json(createTeacher)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateTeacherUsers = async(req,res)=>{
  const {id} = req.params

  try {
    const teacherUser = await lmsUserTeacherModel.findById(id)

    if(!teacherUser){
      res.status(404).json("There is no such user")
    }


    //update properties with the req.body 
    teacherUser.email = req.body.email || teacherUser.email
    teacherUser.phoneNumber = req.body.phoneNumber || teacherUser.phoneNumber
    teacherUser.department = req.body.department || teacherUser.department
    teacherUser.subject = req.body.subject || teacherUser.subject


    let imageUrl = null 

    if(req.file){
      const fileName = req.file.originalname 
      const file  = bucket.file(fileName)
      
      const stream = file.createWriteStream({
        metadata:{
          contentType:req.file.mimetype
        }
      })

      stream.on("error",(err)=>{
        console.error(err);
      })

      stream.on("finish",async()=>{
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        teacherUser.teacherImage = imageUrl
        const updatedTeacherUser = await teacherUser.save()

        res.status(200).json(updatedTeacherUser)
      })
      stream.end(req.file.buffer)
    }else {
      const updatedTeacherUser = await teacherUser.save()
      res.status(200).json(updatedTeacherUser);
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteTeacherUsers = async(req,res)=>{
  const {id} = req.params

  try {

    const deletedTeacherUser = await lmsUserTeacherModel.findByIdAndDelete({_id:id})

    if(!deletedTeacherUser){
      res.status(404).json("There is no such doc")
    }
    res.status(200).json(deletedTeacherUser)

  } catch (error) {
    res.status(200).json(error)
  }
}


//admin student controllers 
const getAllStudents  = async(req,res) => {
  try{
    	const allStudents = await lmsUserStudentModel.find({}).sort({createdAt:-1})
      res.status(200).json(allStudents)
  }catch(error){
    res.status(400).json(error)
  }
}

const getSingleStudent = async(req,res) => {
  const {id} = req.params
  try{
    const singleStudent = await lmsUserStudentModel.findById(id)
    res.status(200).json(singleStudent)
  }catch(error){
    res.status(400).json(error)
  }
}

const createStudentUser = async(req,res) => {
  const {fullName,firstName,lastName,registrationNumber,email,department,academicYear,userRole} = req.body

  try {
    let imageUrl = null

    if(req.file){
      const fileName = req.file.originalname
      const file = bucket.file(fileName)

      const stream = file.createWriteStream({
        metadata:{
          contentType:req.file.mimetype
        }
      })

      stream.on("error",(err)=>{
        console.log(err);
      })

      stream.on("finish", async()=>{
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`

        const student = await lmsUserStudentModel.create({fullName,firstName,lastName,registrationNumber,email,department,academicYear, userRole,studentImage:imageUrl})

        res.status(200).json(student)
      })

      stream.end(req.file.buffer)

    }else{
      const student = await lmsUserStudentModel.create({fullName,firstName,lastName,registrationNumber,email,department,academicYear,userRole, studentImage:null})
      res.status(200).json(student)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateStudentUser = async(req,res) => {
  try {
    const {id} = req.params

    const student = await lmsUserStudentModel.findById(id)

    student.email = req.body.email || student.email
    student.academicYear = req.body.academicYear || student.academicYear

    let imageUrl = null
    if(req.file){
      const fileName = req.file.originalname
      const file = bucket.file(fileName)


      const stream = file.createWriteStream({
        metadata:{
          contentType:req.file.mimetype
        }
      })

      stream.on("error",(err)=>{
        console.log(err);
      })

      stream.on("finish", async()=>{
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`

        student.studentImage = imageUrl
        const updatedStudent = await student.save()

        res.status(200).json(updatedStudent)
      })
      stream.end(req.file.buffer)
    }else{
      const updatedStudent = await student.save()
      res.status(200).json(updatedStudent)
    }

  } catch (error) {
    res.status(400).json(error)
  }

}

const deleteStudentUser = async(req,res) => {
  const {id} = req.params

  try{
    const deletedStudent = await lmsUserStudentModel.findByIdAndDelete({_id:id})
    res.status(200).json(deletedStudent)
  }catch(error){
    res.status(400).json(error)
  }
}

module.exports = {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers, getAllStudents,getSingleStudent, createStudentUser, updateStudentUser, deleteStudentUser,getAllCommonUsers,fetchUserRole,createCommonUser}