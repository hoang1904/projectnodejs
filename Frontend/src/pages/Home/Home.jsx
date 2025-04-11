import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/Appdownload'

// 🟧 Đã thêm: Nhận props searchTerm từ App.jsx
const Home = ({ searchTerm }) => {
  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />

      {/* 🟧 Đã thêm: Truyền thêm searchTerm vào FoodDisplay */}
      <FoodDisplay category={category} searchTerm={searchTerm} />

      <AppDownload />
    </div>
  )
}

export default Home
