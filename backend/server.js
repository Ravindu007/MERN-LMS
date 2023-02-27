require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccount.json")

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  storageBucket:process.env.STORAGE_BUCKET
})

module.exports = {admin:admin}

//routes path
const adminRoutes = require("./routes/adminRoutes")


const App = express()


//middleware 
App.use(express.json())




//Routes

//admin routes
App.use('/api/admin',adminRoutes)


mongoose.set('strictQuery', true)
//database connection 
mongoose.connect(process.env.CONNECTTION_URI)
  .then(()=>{
    //backend port
    App.listen(process.env.PORT, ()=>{
      console.log("listenning on port:",process.env.PORT, " and conncted DB");
    })
  })
  .catch((error)=>{
    console.log(error);
  })