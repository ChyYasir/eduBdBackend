const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  console.log("first");
  //this product we have to get from API body
  // const product = new Product({ ...req.body, thumbnail: req.file.path });
  try {
    const product = new Product({ ...req.body, thumbnail: req.file.path });
    // console.log(req.file);
    // console.log(req.body);
    if (req.body.structure) {
      // Parse the structure JSON string and assign it to the product
      product.structure = JSON.parse(req.body.structure);
    }
    console.log(product);
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.fetchAllProtducts = async (req, res) => {
  //this product we have to get from API body

  let query = Product.find({ deleted: { $ne: true } });
  let totalProductsQuery = Product.find({ deleted: { $ne: true } });
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;

    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });
  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.fetchProductsByInstructor = async (req, res) => {
  const { instructor } = req.query;
  try {
    const products = await Product.find({ instructor: instructor });

    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
