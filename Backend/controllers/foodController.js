import foodModel from "../models/foodModel.js";
import ReviewModel from "../models/ReviewModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list with average rating
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    const foodsWithRatings = await Promise.all(
      foods.map(async (food) => {
        const reviews = await ReviewModel.find({ productId: food._id });

        const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : null;

        return {
          ...food._doc,
          averageRating,
          reviewCount: reviews.length
        };
      })
    );

    res.json({ success: true, data: foodsWithRatings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// Lấy sản phẩm cùng category (trừ sản phẩm đang xem)
const getFoodByCategory = async (req, res) => {
  try {
    const { category, excludeId } = req.params;

    const foods = await foodModel.find({
      category: category,
      _id: { $ne: excludeId }
    });

    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi server" });
  }
};

export { addFood, listFood, removeFood, getFoodByCategory };
