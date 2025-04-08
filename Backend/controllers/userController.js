import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

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

export { loginUser, registerUser, getAllUsers, deleteUser, updateUser };
