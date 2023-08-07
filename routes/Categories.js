const express = require("express");
const { createCategory, fetchCategories } = require("../controller/Category");

const router = express.Router();

router.post("/", createCategory).get("/", fetchCategories);

exports.router = router;
