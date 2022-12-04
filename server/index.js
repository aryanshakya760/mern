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

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.listen(5000);
