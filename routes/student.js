const Student = require("../model/Students");
const router = require("express").Router();

//Schedule aapointment
router.post("/",async (req,res)=>{
    try{
        const newStudent = new Student({
            name : req.body.name,
            degree : req.body.degree,
            percentage : req.body.percentage,
            rollno : req.body.rollno
        })
        const savedUser = await newStudent.save()
        res.status(200).json(savedUser)    
    }catch(err){
        res.status(500).json("Roll no registered"  + err)
    }
})

//Gett All Appointments
router.get("/",async (req,res)=>{
    try{
        const Appointments = await Student.find();
        res.status(200).json(Appointments)
    }catch(err){
        res.status(500).json(err)
    }
})

//Update appointment
router.put('/:rollno',async (req,res)=>{
    try{
        const findId = await Student.findOne({rollno : req.params.rollno})
        const id = findId._id;
        const updatedDate = await Student.findByIdAndUpdate(id,{
            $set :req.body
        },
        {new : true})
        res.status(200).json(updatedDate)
    }catch(err){
        res.status(500).json(err)
    }
})

//get Single Appointment
router.get('/:rollno',async (req,res)=>{
    try{
        const founddUser = await Student.findOne({rollno : req.params.rollno})
        res.status(200).json(founddUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete Appointment
router.delete('/:rollno',async (req,res)=>{
    try{
        const founddUser = await Student.findOne({rollno : req.params.rollno})
        const id = founddUser._id
        await Student.findByIdAndDelete(id)
        res.status(200).json("Student Registry deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router