// admin/src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!stats) return <div>Đang tải thống kê...</div>;

  // Dữ liệu biểu đồ: Top 5 khách hàng
  const topCustomerData = {
    labels: stats.topCustomers?.map(c => c.name) || [],
    datasets: [{
      label: 'Tổng chi tiêu',
      data: stats.topCustomers?.map(c => c.totalSpent) || [],
      backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'],
    }]
  };
  

  // Dữ liệu biểu đồ: Top món ăn bán chạy
  const topFoodData = {
    labels: stats.topProducts?.map(p => p.name) || [],
    datasets: [{
      label: 'Số lượng đã bán',
      data: stats.topProducts?.map(p => p.sold) || [],
      backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'],
    }]
  };
  

  // Dữ liệu biểu đồ: Doanh thu 
  const revenueChartData = {
    labels: stats.revenueByDate?.map(item => item._id) || [],
    datasets: [{
      label: "Doanh thu theo ngày",
      data: stats.revenueByDate?.map(item => item.total) || [],
      backgroundColor: "#4bc0c0",
    }]
  };
  
  

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">🛒 Đơn hàng: {stats.totalOrders}</div>
        <div className="card">💰 Doanh thu: ${stats.totalRevenue?.toFixed(2) || 0}</div>
        <div className="card">📈 Doanh thu TB: ${stats.avgRevenue?.toFixed(2) || 0}</div>
      </div>

      <div className="chart-section">
        <h2 style={{ marginTop: "40px" }}>💵 Doanh thu theo ngày</h2>
        <Bar data={revenueChartData} />
<hr />
        <h2>🏆 Top khách hàng</h2>
        <Bar data={topCustomerData} />
{/* <hr />
      //dang phat trien chuc nang nhung ma deo dc 
        <h2 style={{ marginTop: "40px" }}>🍽️ Món ăn bán chạy</h2>
        <Doughnut data={topFoodData} />
        <div style={{ marginTop: "30px" }}>
          <h3>📋 Chi tiết số lượng món ăn bán ra</h3>
          <table className="top-food-table">
            <thead>
              <tr>
                <th>Món ăn</th>
                <th>Số lượng đã bán</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts?.map((food, index) => (
                <tr key={index}>
                  <td>{food.name}</td>
                  <td>{food.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
