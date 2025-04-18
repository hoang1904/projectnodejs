import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import foodModel from "../models/foodModel.js"; // ✅ Thêm dòng này ở đầu file nếu chưa có
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🧾 Đặt đơn hàng
const placeOrder = async (req, res) => {
  const { items, address, amount, userId } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Thiếu món ăn trong đơn hàng" });
  }

  if (!address || !address.street || !address.city || !address.zipcode) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin địa chỉ" });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ success: false, message: "Số tiền không hợp lệ" });
  }

  try {
    const newOrder = new orderModel({ userId, items, amount, address });
    await newOrder.save();

    // 🔁 Tăng số lượng sold cho mỗi món ăn
    for (const item of items) {
      try {
        await foodModel.findByIdAndUpdate(item._id, {
          $inc: { sold: item.quantity || 1 }
        });
      } catch (err) {
        console.error("❌ Không cập nhật được sold cho món:", item.name);
      }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100
        },
        quantity: item.quantity
      })),
      mode: "payment",
      success_url: `${process.env.BACKEND_URL}/api/order/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false`
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: "Lỗi khi tạo đơn hàng" });
  }
};

// ✅ Xác nhận thanh toán thành công
const verifyOrder = async (req, res) => {
  try {
    const { success, orderId } = req.query;

    if (success === "true" && orderId) {
      const updated = await orderModel.findByIdAndUpdate(orderId, {
        payment: true // chỉ đánh dấu đã thanh toán
      });

      if (updated) {
        return res.redirect(`${process.env.FRONTEND_URL}/myorders`);
      }
    }

    return res.redirect(`${process.env.FRONTEND_URL}/`);
  } catch (error) {
    console.error("❌ Lỗi khi xác minh thanh toán:", error.message);
    return res.redirect(`${process.env.FRONTEND_URL}/`);
  }
};

// ✏️ Cập nhật đơn hàng
const updateOrder = async (req, res) => {
  try {
    const { _id, address, amount, items, status, payment } = req.body;

    const updateFields = {};
    if (address) updateFields.address = address;
    if (amount) updateFields.amount = amount;
    if (items) updateFields.items = items;
    if (status !== undefined) updateFields.status = status;
    if (payment !== undefined) updateFields.payment = payment;

    const updated = await orderModel.findByIdAndUpdate(_id, updateFields, { new: true });

    if (!updated)
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng." });

    res.json({ success: true, message: "Cập nhật thành công", data: updated });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// ❌ Xoá đơn hàng theo orderId
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.json({ success: false, message: "Đơn hàng không tồn tại." });
    }

    res.json({ success: true, message: "Đơn hàng đã được xoá." });
  } catch (error) {
    console.error("Lỗi khi xoá đơn hàng:", error.message);
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};

// 📦 Lấy đơn hàng theo user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.body.userId })
      .sort({ createdAt: -1 }); // ✅ Hiển thị đơn hàng mới nhất trước

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// 📄 Danh sách đơn hàng cho admin (phân trang)
const listOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalOrders = await orderModel.countDocuments({
      items: { $exists: true, $not: { $size: 0 } }
    });

    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name");

    const enrichedOrders = orders.map(order => ({
      _id: order._id,
      items: order.items,
      amount: order.amount,
      address: order.address,
      status: order.status,
      createdAt: order.createdAt,
      customerName: order.userId?.name || "N/A",
      location: order.address
    }));

    res.json({
      success: true,
      data: {
        orders: enrichedOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit)
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// 🔁 Cập nhật trạng thái
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// 🗑️ Xoá nhiều đơn
const deleteMultipleOrders = async (req, res) => {
  try {
    const { orderIds } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res.json({ success: false, message: "Danh sách đơn hàng không hợp lệ." });
    }

    const result = await orderModel.deleteMany({ _id: { $in: orderIds } });

    res.json({ success: true, message: `Đã xoá ${result.deletedCount} đơn hàng.` });
  } catch (error) {
    console.error("Lỗi khi xoá nhiều đơn hàng:", error.message);
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  deleteOrder,
  deleteMultipleOrders,
  updateOrder
};
