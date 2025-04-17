import express from "express";
import { addFood, listFood, removeFood,getFoodByCategory} from "../controllers/foodController.js";
import FoodModel from "../models/foodModel.js"; // 🆕 import thêm model
import multer from "multer";

const foodRouter = express.Router();

// Cấu hình multer để upload ảnh
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// ROUTES chính
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
// API lấy sản phẩm cùng category (trừ sản phẩm đang xem)
foodRouter.get("/category/:category/:excludeId", getFoodByCategory);

// 🆕 API GET /api/food/:id — Lấy chi tiết món ăn theo ID
foodRouter.get("/:id", async (req, res) => {
    try {
        const food = await FoodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(food);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 🆕 API POST /api/food/update — Cập nhật thông tin món ăn
foodRouter.post('/update', async (req, res) => {
    try {
      const { id, name, category, price, description } = req.body;
      await FoodModel.findByIdAndUpdate(id, { name, category, price, description });
      res.json({ success: true, message: 'Updated successfully' });
    } catch (error) {
      res.json({ success: false, message: 'Update failed' });
    }
  });
  
  

export default foodRouter;
