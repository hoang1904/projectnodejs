import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,         // ✅ Thêm dòng này
  PointElement,        // ✅ Thêm dòng này
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,        // ✅ Đăng ký Line chart
  PointElement,       // ✅ Đăng ký Point cho Line
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!stats) return <div>Loading statistics...</div>;

  // 🔹 Revenue by Day
  const revenueChartData = {
    labels: stats.revenueByDate?.map(item => item._id) || [],
    datasets: [{
      label: "Revenue by Day",
      data: stats.revenueByDate?.map(item => item.total) || [],
      backgroundColor: "#4bc0c0",
      borderColor: "#4bc0c0",
      fill: false,
      tension: 0.3
    }]
  };

  // 🔹 Top Customers
  const topCustomerData = {
    labels: stats.topCustomers?.map(c => c.name) || [],
    datasets: [{
      label: 'Total Spending',
      data: stats.topCustomers?.map(c => c.totalSpent) || [],
      backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'],
    }]
  };

  // 🔹 Màu cho món ăn
  const topFoodColors = [
    '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236',
    '#166a8f', '#ff6384', '#36a2eb', '#ffce56', '#9966ff'
  ];

  // 🔹 Best Seller Dishes
  const topFoodData = {
    labels: stats.topProducts?.map(p => p.name) || [],
    datasets: [{
      label: 'Quantity Sold',
      data: stats.topProducts?.map(p => p.sold) || [],
      backgroundColor: topFoodColors.slice(0, stats.topProducts?.length || 5),
      borderColor: topFoodColors.slice(0, stats.topProducts?.length || 5),
      fill: false,
      tension: 0.4
    }]
  };

  const topFoodOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity"
        }
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 30
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* 💳 Summary Cards */}
      <div className="cards">
        <div className="card">🛒 Orders: {stats.totalOrders}</div>
        <div className="card">💰 Total Revenue: ${stats.totalRevenue?.toFixed(2) || 0}</div>
        <div className="card">📈 Avg Revenue: ${stats.avgRevenue?.toFixed(2) || 0}</div>
      </div>

      <div className="chart-section">
        {/* 💵 Revenue */}
        <h2 style={{ marginTop: "40px" }}>💵 Revenue Overview</h2>
        <Line data={revenueChartData} />

        {/* 👑 Top Customers */}
        <hr />
        <h2>🏆 Top Customers</h2>
        <Bar data={topCustomerData} />

        {/* 🍽️ Best Sellers */}
        <hr />
        <h2>🍽️ Best Selling Dishes</h2>
        <Line data={topFoodData} options={topFoodOptions} />

        <div style={{ marginTop: "30px" }}>
          <h3>📋 Food Sales Summary</h3>
          <table className="top-food-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Quantity Sold</th>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
