const express = require("express")
const multer = require("multer")

const {getSingleSubjectByEmail, getSingleSubject} = require("../controllers/lmsUserControls")

// middleware
const requireAuth = require("../middleware/requireAuth")



const router = express.Router()


const upload = multer({
  storage:multer.memoryStorage()
})

const uploadSubject = multer()



router.use(requireAuth)

// user routes
// user Teacher routes
router.get("/teacher/getRealtedSubjects",  getSingleSubjectByEmail)

router.get("/teacher/getRealtedSubjects/:id", getSingleSubject)



module.exports = router