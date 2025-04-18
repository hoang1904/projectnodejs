import Order from "../models/orderModel.js";
import User from "../models/userModel.js"; 
import Food from "../models/foodModel.js"; 

// Tổng số đơn hàng
export async function getTotalOrders() {
  return await Order.countDocuments();
}

// Tổng doanh thu
export async function getTotalRevenue() {
  const orders = await Order.find();
  return orders.reduce((sum, order) => sum + (order.amount || 0), 0);
}

// Doanh thu trung bình
export async function getAverageOrderValue() {
  const totalOrders = await getTotalOrders();
  const totalRevenue = await getTotalRevenue();
  return totalOrders > 0 ? totalRevenue / totalOrders : 0;
}

// Tổng số món ăn
export async function getTotalItems() {
  return await Food.countDocuments();
}

// Món bán chạy nhất
export async function getTopSellingProduct() {
  const product = await Food.findOne().sort({ sold: -1 }); 
  return product;
}

// ✅ Lấy tất cả món trong menu để hiển thị biểu đồ (bao gồm sold = 0)
export async function getTopSellingProducts() {
  const products = await Food.find({}, "name sold").sort({ sold: -1 });
  return products.map(product => ({
    name: product.name,
    sold: product.sold ?? 0
  }));
}

// Thống kê doanh thu theo ngày
export async function getRevenueByDate() {
  const data = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  return data;
}

// Top 5 khách hàng chi tiêu nhiều nhất
export async function getTopCustomers() {
  const result = await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        totalSpent: { $sum: "$amount" },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 5 },
  ]);

  // Lấy tên khách hàng tương ứng
  const populated = await Promise.all(
    result.map(async (item) => {
      const user = await User.findById(item._id);
      return {
        name: user?.name || "Unknown",
        totalSpent: item.totalSpent,
        totalOrders: item.totalOrders,
      };
    })
  );

  return populated;
}
