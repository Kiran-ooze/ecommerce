const Product = require("../models/Product");


// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Create product (Admin)
const createProduct = async (req, res) => {
  try {

    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created",
      product,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Update product (Admin)
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );


    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }


    res.json({
      message: "Product updated",
      product,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Delete product (Admin)
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );


    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }


    res.json({
      message: "Product deleted",
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};