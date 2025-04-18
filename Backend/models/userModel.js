import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    role: { type: String, default: 'User', enum: ['User', 'Staff', 'Admin'] },
  
   
    resetToken: String,               // mã token dùng để xác thực link
    resetTokenExpire: Date            // thời gian hết hạn của token
  }, { minimize: false });
  

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;