import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 * @DESC FETCHES ALL PRODUCTS
 * @route GET/ API/PRODUCTS/
 * @ACCESS PUBLIC
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc FETCHES AN ITEM
 * @route GET API/PRODUCTS/:id
 * @ACCESS PUBLIC
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

/**
 * @desc DELETS AN PRODUCT
 * @route GET API/PRODUCTS/:id
 * @ACCESS PRIVATE ADMIN
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

/**
 * @desc Create AN PRODUCT
 * @route POST API/PRODUCTS
 * @ACCESS PRIVATE ADMIN
 */
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "sample brand",
      category: "sample category",
      countInStock: 0,
      numReviews: 0,
      description: "sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @desc UPDATE A PRODUCT
 * @route PUT API/PRODUCTS/:id
 * @ACCESS PRIVATE ADMIN
 */
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  try {
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      return res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
  }

  res.status(201).json(product);
});

/**
 * @desc get Top Rated PRODUCT
 * @route PUT API/PRODUCTS/top
 * @ACCESS Public
 */
const getTopProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProduct,
};
