const express = require("express");

const server = express();
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json({ limit: "10mb" }));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const instructorRouter = require("./routes/Instructors");
const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
//middlewares

server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/instructors", instructorRouter.router);
server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

server.use("/uploads", express.static("uploads"));
main().catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.resolve(__dirname, "./build")));
  server.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
async function main() {
  await mongoose.connect(process.env.db_url);
  console.log("Database Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Server Started");
});
// chyyasir2000
// fUe4dFIoAWxK58j8
