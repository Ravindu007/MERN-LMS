const express = require("express")
const multer = require("multer")

const {createTeacherUser, getAllTeacherUsers, getSingleTeacherUser, updateTeacherUsers, deleteTeacherUsers, getAllStudents,getSingleStudent, createStudentUser, updateStudentUser, deleteStudentUser,getAllCommonUsers,fetchUserRole,createCommonUser} = require("../controllers/adminControllers")

const {getAllSubjects, getSingleSubject, createSubject, updateSubject, deleteSubject} = require("../controllers/subjectControllers")

const {getAllEvents, getSingleEvent,createEvent,updateEvent,deleteEvent} = require("../controllers/eventControllers")



// middleware
const requireAuth = require("../middleware/requireAuth")


const router = express.Router()


const upload = multer({
  storage:multer.memoryStorage()
})

const uploadSubject = multer()

const uploadCommonUser = multer()


router.use(requireAuth)


//common user
router.get("/lmsUser/commonUser",getAllCommonUsers)

router.get("/lmsUser/commonUser/userRole",fetchUserRole)

router.post("/lmsUser/commonUser",uploadCommonUser.none(),  createCommonUser)




//admin - USER  Routes
//get all created teacher - users
router.get("/lmsUsers/teachers", getAllTeacherUsers)

router.post("/lmsUsers/teachers", upload.single('teacherImage'), createTeacherUser)

router.patch("/lmsUsers/teachers/:id",upload.single('teacherImage'), updateTeacherUsers)

router.delete("/lmsUsers/teachers/:id",deleteTeacherUsers)



//admin Subject Routes
router.get("/subjects", getAllSubjects)

router.get("/subjects/:id", getSingleSubject)

router.post("/subjects", uploadSubject.none(), createSubject)

router.patch("/subjects/:id",uploadSubject.none(), updateSubject)

router.delete("/subjects/:id", deleteSubject)


//admin user-students routs 
router.get("/lmsUsers/students", getAllStudents)

router.get("/lmsUsers/students/:id", getSingleStudent)

router.post("/lmsUsers/students", upload.single('studentImage'), createStudentUser)

router.patch("/lmsUsers/students/:id",upload.single('studentImage'), updateStudentUser)

router.delete("/lmsUsers/students/:id",deleteStudentUser)



// admin event routes
router.get('/events', getAllEvents)

router.get('/events/:id', getSingleEvent)

router.post('/events', upload.single('eventImage') ,createEvent)

router.patch('/events/:id',upload.single('eventImage') , updateEvent)

router.delete('/events/:id', deleteEvent)


module.exports = router