const express = require("express");
const { createBrand, fetchBrands } = require("../controller/Brand");

const router = express.Router();

router.post("/", createBrand).get("/", fetchBrands);

exports.router = router;
