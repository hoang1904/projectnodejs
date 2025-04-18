// controllers/dashboardController.js
import Order from "../models/orderModel.js";
// import Product from "../models/productModel.js";
import User from "../models/userModel.js"; 
import Food from "../models/foodModel.js"; 


export async function getTotalOrders() {
  return await Order.countDocuments();
}

export async function getTotalRevenue() {
  const orders = await Order.find();
  return orders.reduce((sum, order) => sum + (order.amount || 0), 0);
}

export async function getAverageOrderValue() {
  const totalOrders = await getTotalOrders();
  const totalRevenue = await getTotalRevenue();
  return totalOrders > 0 ? totalRevenue / totalOrders : 0;
}

export async function getTotalItems() {
  return await Food.countDocuments();
}

export async function getTopSellingProduct() {
  const product = await Food.findOne().sort({ sold: -1 }); 
  return product;
}

export async function getTopSellingProducts(limit = 5) {
  const products = await Food.find({}, "name sold").sort({ sold: -1 }).limit(limit);

  return products.map(product => ({
    name: product.name,
    sold: product.sold ?? 0
  }));
}







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

  // Lấy thông tin user để hiển thị tên
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
