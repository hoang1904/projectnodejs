import express from "express";
import {
  getTotalOrders,
  getTotalRevenue,
  getAverageOrderValue,
  getTotalItems,
  getRevenueByDate,
  getTopCustomers,
  getTopSellingProducts
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
      getTopSellingProducts(5)
    ]);

    res.json({
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
