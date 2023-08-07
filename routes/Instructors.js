const express = require("express");
const {
  fetchInstructorById,
  updateInstructor,
} = require("../controller/Instructor");

const router = express.Router();

router.get("/:id", fetchInstructorById).patch("/:id", updateInstructor);

exports.router = router;
