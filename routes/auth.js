const Contact = require("../model/Contact");
const router = require("express").Router();
const User = require("../model/User")
const bcrypt = require("bcrypt");

router.post("/register",async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    try{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password : hashedPassword
        })
        const findUser =await User.findOne({username : req.body.username})
        if(findUser){
            res.status(200).json("Try with other names")
        }else{
            const userRegistered =await newUser.save() 
            res.status(200).json(userRegistered)
        }
    }catch(err){
        console.log(err);
    }
})
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return res.status(400).json("User Does Not Exists");
        }

        const validated = await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("Wrong Creddentials")

        const{password,...others} = user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router