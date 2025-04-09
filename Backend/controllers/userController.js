import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
// Tạo token JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ===========================
// LOGIN USER
// ===========================
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid login information" });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ===========================
// REGISTER USER
// ===========================
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email. Please enter valid email again" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long. Please enter strong password"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ===========================
// GET ALL USERS
// ===========================
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password"); // Ẩn field password
    res.status(200).json(users);
  } catch (err) {
    console.error("Error when get user:", err);
    res.status(500).json({ message: "Error server" });
  }
};

// ===========================
// DELETE USER
// ===========================
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ message: "User was successfully deleted" });
  } catch (err) {
    console.error("Error while deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===========================
// UPDATE USER
// ===========================
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Lỗi update user:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// ✅ Thêm hàm resetPassword
const resetPassword = async (req, res) => {
  const { id, token, newPassword } = req.body;

  try {
    const user = await userModel.findById(id);

    if (!user || user.resetToken !== token || user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset link." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful." });
  } catch (err) {
      console.error("Lỗi gửi mail:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// ✅ Thêm hàm forgotPassword
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Email không tồn tại." });
    }

    const token = Math.random().toString(36).substring(2);
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 60; // Hạn 1 tiếng
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
     
  from: `"Tomato 🍅" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset mật khẩu",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #f7f7f7; border-radius: 10px; font-family: Arial, sans-serif;">
          <h2 style="text-align: center; color: #ff6600;">Yêu cầu khôi phục mật khẩu</h2>
          <p>Xin chào,</p>
          <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}"
               style="background-color: #ff6600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Đổi mật khẩu
            </a>
          </p>
          <p style="font-size: 14px; color: gray;">Liên kết chỉ có hiệu lực trong vòng 1 giờ.</p>
          <p style="margin-top: 40px;">Trân trọng,<br/>Đội ngũ hỗ trợ Tomato</p>
        </div>
      `,
    };
    

    // 🔍 Debug log
    console.log("🔐 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🔐 EMAIL_PASS:", process.env.EMAIL_PASS ? "Đã có" : "Chưa có");
    console.log("📩 Gửi đến:", email);
    console.log("🔗 Link reset:", `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`);

    // Gửi email và bắt lỗi chi tiết
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Gửi mail thất bại:", err);
        return res.status(500).json({ success: false, message: "Lỗi khi gửi mail", error: err.message });
      }
      console.log("✅ Mail gửi thành công:", info.response);
      res.json({ success: true, message: "Đã gửi email reset mật khẩu." });
    });

  } catch (err) {
    console.error("❌ Lỗi ngoài luồng:", err);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra khi gửi email." });
  }
};




export { loginUser, registerUser, getAllUsers, deleteUser, updateUser,resetPassword, forgotPassword };
