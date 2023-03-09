const {admin} = require("../server")
const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET)


const eventModel = require("../models/eventModel")

const getAllEvents = async(req,res) => {
  try{
    const allEvents = await eventModel.find({}).sort({createdAt:-1})
    res.status(200).json(allEvents)
  }catch(error){
    res.status(400).json(error)
  }
}

const getSingleEvent = async(req,res) => {

  const {id} = req.params
  try{
    const singleEvent = await eventModel.findById(id)
    res.status(200).json(singleEvent)
  }catch(error){
    res.status(400).json(error)
  }
}


const createEvent = async(req,res) => {
  const {eventName, eventDetails} = req.body
  try {
    let imageUrl = null 
    
    if(req.file){
      const fileName = req.file.originalname 
      const file  = bucket.file(fileName)
      
      const stream = file.createWriteStream({
        metadata:{
          contentType:req.file.mimetype
        }
      })

      stream.on("error",(err)=>{
        console.error(err);
      })

      stream.on("finish",async()=>{
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const createdEvent = await eventModel.create({eventName, eventDetails,
          eventImage:imageUrl
        })
        res.status(200).json(createdEvent)
      })
      stream.end(req.file.buffer)
    }else{
      const createdEvent = await eventModel.create({
        eventName,
        eventDetails,
        eventImage:null
      })
      res.status(200).json(createdEvent)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateEvent = async(req,res) => {
  const {id} = req.params

  try {
    const event = await eventModel.findById(id)

    if(!event){
      res.status(404).json("There is no such event")
    }


    //update properties with the req.body 
    event.eventName = req.body.eventName || event.eventName
    event.eventDetails = req.body.eventDetails || event.eventDetails


    let imageUrl = null 

    if(req.file){
      const fileName = req.file.originalname 
      const file  = bucket.file(fileName)
      
      const stream = file.createWriteStream({
        metadata:{
          contentType:req.file.mimetype
        }
      })

      stream.on("error",(err)=>{
        console.error(err);
      })

      stream.on("finish",async()=>{
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        event.eventImage = imageUrl
        const updatedEvent = await event.save()

        res.status(200).json(updatedEvent)
      })
      stream.end(req.file.buffer)
    }else {
      const updatedEvent = await event.save()
      res.status(200).json(updatedEvent);
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteEvent = async(req,res) => {
  const {id} = req.params
  try{
    const deletedEvent = await eventModel.findByIdAndDelete({_id:id})
    res.status(200).json(deletedEvent)
  }catch(error){
    res.status(400).json(error)
  }
}



module.exports = {getAllEvents, getSingleEvent,createEvent,updateEvent,deleteEvent}