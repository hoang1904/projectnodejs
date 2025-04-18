import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setStatus("❌ Mật khẩu xác nhận không trùng khớp.");
    }

    try {
      const id = searchParams.get("id");
      const token = searchParams.get("token");
      const res = await axios.post("http://localhost:4000/api/user/reset-password", {
        id,
        token,
        newPassword,
      });

      if (res.data.success) {
        setStatus("✅ Đổi mật khẩu thành công! Bạn sẽ được chuyển hướng...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus("❌ " + res.data.message);
      }
    } catch (err) {
      setStatus("❌ Có lỗi xảy ra khi gửi yêu cầu.");
    }
  };

  return (
    <div className="reset-password-page">
     <form className="reset-password-container" onSubmit={handleSubmit}>
  <h2 className="title">LẤY LẠI MẬT KHẨU</h2>
  <p className="subtitle">Xác thực thông tin cá nhân của bạn</p>

  <input
    type="password"
    placeholder="Nhập mật khẩu mới"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Xác nhận mật khẩu"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button type="submit">Change password</button>
  {status && <p className="status-text">{status}</p>}
</form>

    </div>
  );
};

export default ResetPassword;
