import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/Appdownload'

<<<<<<< HEAD
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
=======

const Home = () => {
  
  const[category,setCategory] = useState("All")
  
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>

>>>>>>> ebb187b (admin-edit-order)
  )
}

export default Home
