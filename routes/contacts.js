const Contact = require("../model/Contact");
const router = require("express").Router();

//Schedule aapointment
router.post("/",async (req,res)=>{
    try{
        const newAppointment = new Contact({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            date : req.body.date,
        })
        const appointmentList= await newAppointment.save()
        res.status(200).json(appointmentList)
    }catch(err){
        res.status(500).json(req.body.name + " Already Scheduled an appointment")
    }
})
router.get("/",async (req,res)=>{
    try{
        const Appointments = await Contact.find();
        res.status(200).json(Appointments)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router