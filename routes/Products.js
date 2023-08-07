const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createProduct,
  fetchAllProtducts,
  fetchProductById,
  updateProduct,
  fetchProductsByInstructor,
} = require("../controller/Product");

//producst is already added in base path
const router = express.Router();

router
  .post("/", upload.single("thumbnail"), createProduct)
  .get("/", fetchAllProtducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .get("/", fetchProductsByInstructor);

exports.router = router;
