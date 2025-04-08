import express from "express";
import ReviewModel from "../models/ReviewModel.js";
import OrderModel from "../models/orderModel.js"; // nếu bạn cần sau này

const router = express.Router();

// Thêm đánh giá mới
router.post("/add", async (req, res) => {
  try {
    const { productId, userId, userName, content, rating } = req.body;

    if (!productId || !userId || !userName || !content || rating === undefined) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin đánh giá" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Số sao phải từ 1 đến 5" });
    }

    const existingReview = await ReviewModel.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: "Bạn đã đánh giá món ăn này rồi." });
    }

    const review = new ReviewModel({ productId, userId, userName, content, rating });
    await review.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Lỗi khi thêm đánh giá:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// Lấy danh sách đánh giá của 1 sản phẩm
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Xoá đánh giá
router.delete("/:reviewId", async (req, res) => {
  try {
    const { userId } = req.body;
    const review = await ReviewModel.findById(req.params.reviewId);
    if (!review || review.userId !== userId) {
      return res.status(403).json({ message: "Không có quyền xoá" });
    }
    await ReviewModel.findByIdAndDelete(req.params.reviewId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Sửa đánh giá
router.patch("/:reviewId", async (req, res) => {
  try {
    const { userId, content, rating } = req.body;
    const review = await ReviewModel.findById(req.params.reviewId);

    if (!review || review.userId !== userId) {
      return res.status(403).json({ message: "Không có quyền chỉnh sửa" });
    }

    if (content) review.content = content;
    if (rating !== undefined && rating >= 1 && rating <= 5) {
      review.rating = rating;
    }

    await review.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
