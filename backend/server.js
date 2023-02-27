require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")


//routes path
const adminRoutes = require("./routes/adminRoutes")


const App = express()


//middleware 
App.use(express.json())




//Route
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