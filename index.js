const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors")
const contactRoute = require("./routes/contacts")
const authRoute = require('./routes/auth')

const app = express();
app.use(cors())


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology :true,
    useNewUrlParser : true,
    autoIndex : true,
}).then(()=>console.log("DB Connected")).catch((err)=>console.log(err));

app.use("/api/contact",contactRoute)
app.use("/api/auth",authRoute)

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Started")
})