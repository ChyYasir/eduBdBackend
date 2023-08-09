const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { fetchUserById, updateUser } = require("../controller/User");

const router = express.Router();

router.get("/:id", fetchUserById).patch("/:id", updateUser);

exports.router = router;
