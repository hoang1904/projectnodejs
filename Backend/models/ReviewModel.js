import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Food" },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // ✅ Thêm rating từ 1 đến 5 sao
  createdAt: { type: Date, default: Date.now }
});

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
