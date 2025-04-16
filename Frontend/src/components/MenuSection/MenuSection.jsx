import React from 'react';
import ExploreMenu from './ExploreMenu';
import FoodDisplay from './FoodDisplay';

const MenuSection = ({ category, setCategory, searchTerm, sortOption }) => {
  return (
    <div className='menu-section'>
      <h1>Explore Our Menu</h1>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchTerm={searchTerm} sortOption={sortOption} />
    </div>
  );
};

export default MenuSection;
