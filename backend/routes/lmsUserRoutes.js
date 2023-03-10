const express = require("express")
const multer = require("multer")

const {getSingleSubjectByEmail, getSingleSubject, getAllRelatedLessons,createLesson, updateLesson,deleteLesson, getStudentDetails,getRelatedSubjects,getAllAssignements,getSingleAssignment, createAssignemnt, updateAssignment, deleteAssignment,getAllRelatedSubmissions,getRelavantSubmissionsRelatedToEmail,createAssignmentSubmission, getAllAssignementsToTheProfile,updateSubmission} = require("../controllers/lmsUserControls")

// middleware
const requireAuth = require("../middleware/requireAuth")



const router = express.Router()


const upload = multer({
  storage:multer.memoryStorage()
})

const uploadMarks = multer()



router.use(requireAuth)

// user routes
// user Teacher routes
router.get("/teacher/getRealtedSubjects",  getSingleSubjectByEmail)

router.get("/teacher/getRealtedSubjects/:id", getSingleSubject)


//user routes
// user student routes 

// getting academic year and department using the email
router.get("/students/getDetails", getStudentDetails)

// getting subjects match to academic year and department using the email
router.get("/students/getRelatedSubjects", getRelatedSubjects)


//lessons routes (teachers)
// get all related lessons
router.get("/teacher/allRelatedLessons", getAllRelatedLessons)

//create a lesson
router.post("/teacher/allRelatedLessons", upload.single('lessonFile'), createLesson)

router.patch("/teacher/allRelatedLessons/:id",upload.single('lessonFile'),updateLesson )

router.delete("/teacher/allRelatedLessons/:id",deleteLesson )




//assignment routes (teacher)
router.get("/teacher/getRelatedAssignments", getAllAssignements)

router.get("/teacher/getRelatedAssignments/:id", getSingleAssignment)

router.post("/teacher/getRelatedAssignments", upload.single('assignmentFile'), createAssignemnt)

router.patch("/teacher/getRelatedAssignments/:id", upload.single('assignmentFile'), updateAssignment)

router.delete("/teacher/getRelatedAssignments/:id", deleteAssignment)


// get all the assignments to the students 
router.get("/studnet/getAlltheAssignmentsToDo", getAllAssignementsToTheProfile)



// submission routes (students)
router.get("/getSubmissions", getAllRelatedSubmissions)

router.get("/getSubmissions/related",getRelavantSubmissionsRelatedToEmail)


router.post("/getSubmissions",upload.single('submissionFile'), createAssignmentSubmission)

// mark submissions
router.patch("/getSubmissions/:id", uploadMarks.none(), updateSubmission)

module.exports = router