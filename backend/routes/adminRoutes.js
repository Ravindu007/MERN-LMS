const express = require("express")

const {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers} = require("../controllers/lmsUserControllers")

const router = express.Router()


//admin - USER  Routes

//get all created teacher - users
router.get("/users/teachers", getAllTeacherUsers)

router.post("/users/teachers", createTeacherUser)

router.patch("/users/teachers/:id",updateTeacherUsers)

router.delete("/users/teachers/:id",deleteTeacherUsers)






module.exports = router