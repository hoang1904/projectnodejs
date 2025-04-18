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

    // 🔒 Kiểm tra độ dài mật khẩu
    if (newPassword.length < 8) {
      return setStatus("❌ Password must be at least 8 characters.");
    }

    if (newPassword !== confirmPassword) {
      return setStatus("❌ Password confirmation does not match.");
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
        setStatus("✅ Password reset successfully! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus("❌ " + res.data.message);
      }
    } catch (err) {
      setStatus("❌ An error occurred while sending the request.");
    }
  };

  return (
    <div className="reset-password-page">
      <form className="reset-password-container" onSubmit={handleSubmit}>
        <h2 className="title">Reset Password</h2>
        <p className="subtitle">Please verify your identity and create a new password</p>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
        {status && <p className="status-text">{status}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
