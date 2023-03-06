const express = require("express")
const multer = require("multer")

const {getSingleSubjectByEmail, getSingleSubject, getAllRelatedLessons,createLesson} = require("../controllers/lmsUserControls")

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




//lessons routes (teachers)
// get all related lessons
router.get("/teacher/allRelatedLessons", getAllRelatedLessons)

//create a lesson
router.post("/teacher/allRelatedLessons", upload.single('lessonFile'), createLesson)


module.exports = router