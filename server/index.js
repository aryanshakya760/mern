const express = require("express");
const cors = require("cors");
require("./dbconfig/config");

const User = require('./dbconfig/User')

const app = express();

//middleware used to provide json file in database
app.use(express.json());
//middleware used to resolve errors in frontend
app.use(cors());

app.post('/register',async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    res.send(result)
})

app.listen(5000);
