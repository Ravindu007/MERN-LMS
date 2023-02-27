const express = require("express")
const multer = require("multer")

const {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers} = require("../controllers/lmsUserControllers")

const router = express.Router()

const upload = multer({
  storage:multer.memoryStorage()
})



//admin - USER  Routes

//get all created teacher - users
router.get("/users/teachers", getAllTeacherUsers)

router.post("/users/teachers", upload.single('teacherImage'), createTeacherUser)

router.patch("/users/teachers/:id",upload.single('teacherImage'), updateTeacherUsers)

router.delete("/users/teachers/:id",deleteTeacherUsers)






module.exports = router