const express = require("express");
const mongoose = require("mongoose");

const app = express();
const User = require("./Models/Usermodel");
const cs = "mongodb://localhost:27017/BlogManagementSystem";

app.use(express.json());

mongoose
  .connect(cs, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected Successfully ......"))
  .catch((err) => console.error("Database Connection Failed ......", err));

app.get("/", (req, res) => {
  console.log("The server is live at get 3000");
  res.json("the server is live at 3000");
});

app.post("/signup", async (req, res) => {
  try {
    const useremail = req.body.mail;
    const userpassword = req.body.password;
    const username = req.body.name;

    const existingUser = await User.findOne({ mail: useremail }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = User({
        name: username,
        mail: useremail,
        password: userpassword,
      });

      const response = await newUser
        .save()
        .then((user) => {
          console.log("User Successfully created", user);
          res.status(200).json({ message: "User Successfully created", user });
        })
        .catch((err) => {
          console.log(err.toString());
          res.status(400).json({ message: "User Creation Failed" });
        });
    }
  } catch (e) {
    res.status(500).json(e);
    console.log(e.toString());
  }
});

app.get("/login", async (req, res) => {
  try {
    const usermail = req.body.mail;
    const password = req.body.password;

    const user = await User.findOne({ mail: usermail }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log(user);
    if (user.mail == usermail && user.password == password) {
      res.status(200).json({ message: "User Successfully Login" });
    } else {
      res.status(400).json({ message: "Invalid Cridentials" });
    }
  } catch (e) {
    console.log(e.toString());
    res.status(500).json({ message: e });
  }
});

app.listen(3000);
