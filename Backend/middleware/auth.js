import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Gán vào cả req.user và req.body.userId để tương thích code cũ
    req.user = { id: decoded.id };
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("❌ Token không hợp lệ:", error.message);
    return res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }
};

export default authMiddleware;
