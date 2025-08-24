// src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [activeLink, setActiveLink] = useState('products');

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  return (
    <Router>
      <div className="react-shop">
        {/* Pink Header */}
        <header className="shop-header">
          <div className="container">
            <img 
              src={process.env.PUBLIC_URL + '/petstop-logo.jpg'} 
              alt="PetStop Shop" 
              className="shop-logo" 
            />
            <nav className="shop-nav">
              <Link 
                to="/" 
                className={activeLink === 'products' ? 'active' : ''}
                onClick={() => setActiveLink('products')}
              >
                Products
              </Link>
              <Link 
                to="/booking" 
                className={activeLink === 'booking' ? 'active' : ''}
                onClick={() => setActiveLink('booking')}
              >
                Booking
              </Link>
              <Link 
                to="/cart" 
                className={activeLink === 'cart' ? 'active' : ''}
                onClick={() => setActiveLink('cart')}
              >
                Cart ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)})
              </Link>
            </nav>
          </div>
        </header>

        <main className="shop-main">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <h1 className="shop-title">Our <span>Products</span></h1>
                  <div className="product-grid">
                    <div className="product-card">
                      <div className="product-image-container">
                        <img src="/images/dog-on-pillow.png" alt="Dog Product" />
                      </div>
                      <div className="product-info">
                        <h3>Sample Product</h3>
                        <p>This is a test product to verify the app is working.</p>
                        <p className="product-price">$29.99</p>
                        <button className="add-to-cart-btn" onClick={() => addToCart({id: 1, product_name: 'Sample Product', price: 29.99})}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/booking"
              element={
                <div className="container bg-white p-4 border-light">
                  <h1 className="shop-title">Book <span>Appointment</span></h1>
                  <p>Booking form will be added here.</p>
                </div>
              }
            />
            <Route
              path="/cart"
              element={
                <div className="container">
                  <h1 className="shop-title">Shopping <span>Cart</span></h1>
                  {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <div>
                      {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                          <span>{item.product_name}</span>
                          <span>${item.price}</span>
                          <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            />
            <Route
              path="/success"
              element={
                <div className="container">
                  <h1 className="shop-title">Success!</h1>
                  <p>Your purchase was successful</p>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="shop-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} PetStop Shop. All rights reserved.</p>
            <p>800 Upper Serangoon Road, Singapore 534670</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;