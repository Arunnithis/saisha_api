const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const contactRoute = require("./routes/contacts")

const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology :true,
    useNewUrlParser : true,
    autoIndex : true,
}).then(()=>console.log("DB Connected")).catch((err)=>console.log(err));

app.use("/api/contact",contactRoute)

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Started")
})