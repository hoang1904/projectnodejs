import userModel from "../models/userModel.js";

// ✅ Thêm sản phẩm vào giỏ hàng (có quantity nếu truyền)
const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { itemId, quantity = 1 } = req.body;

    if (!itemId || quantity < 1) {
      return res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ" });
    }

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = quantity;
    } else {
      cartData[itemId] += quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Đã thêm vào giỏ hàng", cartData });
  } catch (error) {
    console.error("❌ Lỗi khi thêm vào giỏ:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// ✅ Xoá sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Đã xoá khỏi giỏ", cartData });
  } catch (error) {
    console.error("❌ Lỗi khi xoá:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// ✅ Lấy dữ liệu giỏ hàng
const getCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng." });
    }

    const cartData = user.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("❌ Lỗi khi lấy giỏ:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};


export { addToCart, removeFromCart, getCart };
