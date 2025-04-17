import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  sold: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
