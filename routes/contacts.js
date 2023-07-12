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
        const found = await Contact.findOne({phone : req.body.phone})
        if(found){
            res.status(200).json(`${found.name} has already has booked appointment on ${found.date}`)
        }else{
           const savedUser = await newAppointment.save()
           res.status(200).json(savedUser)
        }    
    }catch(err){
        res.status(500).json(err)
    }
})

//Gett All Appointments
router.get("/",async (req,res)=>{
    try{
        const Appointments = await Contact.find();
        res.status(200).json(Appointments)
    }catch(err){
        res.status(500).json(err)
    }
})

//Update appointment
router.put('/:phone',async (req,res)=>{
    try{
        const findId = await Contact.findOne({phone : req.params.phone})
        const id = findId._id;
        const updatedDate = await Contact.findByIdAndUpdate(id,{
            date :req.body.date
        },
        {new : true})
        res.status(200).json(updatedDate)
    }catch(err){
        res.status(500).json(err)
    }
})

//get Single Appointment
router.get('/find/:phone',async (req,res)=>{
    try{
        const founddUser = await Contact.findOne({phone : req.params.phone})
        res.status(200).json(founddUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete Appointment
router.delete('/:phone',async (req,res)=>{
    try{
        const founddUser = await Contact.findOne({phone : req.params.phone})
        const id = founddUser._id
        await Contact.findByIdAndDelete(id)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router