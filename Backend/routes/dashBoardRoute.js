import express from "express";
import {
  getTotalOrders,
  getTotalRevenue,
  getAverageOrderValue,
  getRevenueByDate,
  getTopCustomers,
  getTopSellingProducts // ✅ Đã sửa để trả về tất cả món ăn
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [
      totalOrders,
      totalRevenue,
      avgRevenue,
      revenueByDate,
      topCustomers,
      topProducts
    ] = await Promise.all([
      getTotalOrders(),
      getTotalRevenue(),
      getAverageOrderValue(),
      getRevenueByDate(),
      getTopCustomers(),
      getTopSellingProducts() // ✅ Lấy tất cả món
    ]);

    res.json({
      success: true,
      totalOrders,
      totalRevenue,
      avgRevenue,
      revenueByDate,
      topCustomers,
      topProducts
    });
  } catch (err) {
    console.error("❌ Lỗi dashboard API:", err);
    res.status(500).json({ success: false, message: "Lỗi khi lấy dashboard" });
  }
});

export default router;
