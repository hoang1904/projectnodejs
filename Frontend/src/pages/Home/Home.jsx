import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/Appdownload';

// 🟧 Đã thêm: Nhận props searchTerm từ App.jsx
const Home = ({ searchTerm }) => {
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("all"); // 🟧 THÊM: sortOption để lọc món bán chạy

  return (
    <div>
      <Header />

      {/* 🔧 GỘP ExploreMenu và FoodDisplay thành một section */}
      <div className="menu-section">
        {/* 🔧 CHỈ giữ 1 tiêu đề chính */}
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Explore Our Menu</h1>

        {/* ✅ Danh mục món ăn + lọc món bán chạy */}
        <ExploreMenu category={category} setCategory={setCategory} sortOption={sortOption} setSortOption={setSortOption} />

        {/* ✅ Danh sách món ăn */}
        <div style={{ marginTop: "30px" }}>
          <FoodDisplay category={category} searchTerm={searchTerm} sortOption={sortOption} />
        </div>
      </div>

      <AppDownload />
    </div>
  );
};

export default Home;
