const {admin} = require("../server")

const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET)


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
    const teacherUser = await lmsUserTeacherModel.findById({id})

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
        const updatedTeacherUser = await lmsUserTeacherModel.save()

        res.status(200).json(updatedTeacherUser)
      })
      stream.end(req.file.buffer)
    }else{
      const updatedTeacherUser = await lmsUserTeacherModel.save()

      res.status(200).json(updatedTeacherUser)
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