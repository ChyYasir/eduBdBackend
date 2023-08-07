const express = require("express");
const {
  createUser,
  loginUser,
  createInstructor,
  loginInstructor,
} = require("../controller/Auth");

const router = express.Router();

router
  .post("/user/signup", createUser)
  .post("/user/login", loginUser)
  .post("/instructor/signup", createInstructor)
  .post("/instructor/login", loginInstructor);

exports.router = router;
