const express = require("express")
const multer = require("multer")

const {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers, getAllStudents,getSingleStudent, createStudentUser, updateStudentUser, deleteStudentUser} = require("../controllers/lmsUserControllers")

const {getAllSubjects, getSingleSubject, createSubject, updateSubject, deleteSubject} = require("../controllers/subjectControllers")


const router = express.Router()

const upload = multer({
  storage:multer.memoryStorage()
})

const uploadSubject = multer()


//admin - USER  Routes
//get all created teacher - users
router.get("/users/teachers", getAllTeacherUsers)

router.post("/users/teachers", upload.single('teacherImage'), createTeacherUser)

router.patch("/users/teachers/:id",upload.single('teacherImage'), updateTeacherUsers)

router.delete("/users/teachers/:id",deleteTeacherUsers)



//admin Subject Routes
router.get("/subjects", getAllSubjects)

router.get("/subjects/:id", getSingleSubject)

router.post("/subjects", uploadSubject.none(), createSubject)

router.patch("/subjects/:id",uploadSubject.none(), updateSubject)

router.delete("/subjects/:id", deleteSubject)


//admin user-students routs 
router.get("/users/students", getAllStudents)

router.get("/users/students/:id", getSingleStudent)

router.post("/users/students", upload.single('studentImage'), createStudentUser)

router.patch("/users/students/:id",upload.single('studentImage'), updateStudentUser)

router.delete("/users/students/:id",deleteStudentUser)



module.exports = router