const express = require("express")
const multer = require("multer")

const {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers} = require("../controllers/lmsUserControllers")

const router = express.Router()

const uploadUsers = multer()

//admin - USER  Routes

//get all created teacher - users
router.get("/users/teachers", getAllTeacherUsers)

router.post("/users/teachers", uploadUsers.none(), createTeacherUser)

router.patch("/users/teachers/:id",updateTeacherUsers)

router.delete("/users/teachers/:id",deleteTeacherUsers)






module.exports = router