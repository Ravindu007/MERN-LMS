const express = require("express")
const multer = require("multer")

const {getSingleSubjectByEmail, getSingleSubject, getAllRelatedLessons,createLesson, updateLesson,deleteLesson, getStudentDetails} = require("../controllers/lmsUserControls")

// middleware
const requireAuth = require("../middleware/requireAuth")



const router = express.Router()


const upload = multer({
  storage:multer.memoryStorage()
})




router.use(requireAuth)

// user routes
// user Teacher routes
router.get("/teacher/getRealtedSubjects",  getSingleSubjectByEmail)

router.get("/teacher/getRealtedSubjects/:id", getSingleSubject)


//user routes
// user student routes 

// getting academic year and department using the email
router.get("/students/getDetails", getStudentDetails)




//lessons routes (teachers)
// get all related lessons
router.get("/teacher/allRelatedLessons", getAllRelatedLessons)

//create a lesson
router.post("/teacher/allRelatedLessons", upload.single('lessonFile'), createLesson)

router.patch("/teacher/allRelatedLessons/:id",upload.single('lessonFile'),updateLesson )

router.delete("/teacher/allRelatedLessons/:id",deleteLesson )


module.exports = router