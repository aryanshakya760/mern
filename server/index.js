const express = require("express");
const cors = require("cors");
require("./dbconfig/config");

const User = require("./dbconfig/User");
const Product = require("./dbconfig/Product");

const app = express();

//middleware used to provide json file in database
app.use(express.json());
//middleware used to resolve errors in frontend
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "No User found" });
  }
});

app.post("/add-product", async(req,res)=>{
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});


app.listen(5000);
