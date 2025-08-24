import React from 'react';

const ShopByPet = () => {
  return (
    <div className="shop-by-pet-section">
      <div className="container">
        <h3>Shop by Pet Type</h3>
        <div className="pet-categories">
          <div className="pet-category">
            <img src="/images/dog-icon.png" alt="Dog" />
            <h4>Dogs</h4>
          </div>
          <div className="pet-category">
            <img src="/images/cat-icon.png" alt="Cat" />
            <h4>Cats</h4>
          </div>
          <div className="pet-category">
            <img src="/images/bird.png" alt="Bird" />
            <h4>Birds</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByPet;
