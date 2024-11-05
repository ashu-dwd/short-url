const express = require("express");
const User = require("../models/user");
const { v4: uuid } = require("uuid");
const { setUser } = require("../service/auth");
async function createUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const result = await User.create({ name, email, password });
    console.log(result);
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", {
      msg: "Please enter both email and password",
    });
  }

  try {
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
      return res.render("login", {
        message: "Invalid email or password",
      });
    }
    //const sessionId = uuid();
    const token = setUser(user);
    res.cookie("uid", token);
    console.log("User logged in:", user);
    return res.redirect("/");
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).send({ message: "Server error" });
  }
}

module.exports = {
  createUser,
  loginUser,
};
