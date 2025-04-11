<<<<<<< HEAD
import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
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

// 🆕 API GET /api/food/:id — Lấy chi tiết món ăn theo ID
foodRouter.get("/:id", async (req, res) => {
    try {
        const food = await FoodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        res.json(food);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

export default foodRouter;
=======
import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer"

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood); 



export default foodRouter; 
>>>>>>> ebb187b (admin-edit-order)
