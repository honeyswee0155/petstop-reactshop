// src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import Booking from './components/Booking';
import DonePage from './pages/Done';
import Chatbot from './components/Chatbot';
import CartPage from './pages/CartPage';

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
              src="/petstop-logo.jpg" 
              alt="PetStop Shop" 
              className="shop-logo" 
            />
            <nav className="shop-nav">
              <a 
                href="/" 
                className={activeLink === 'products' ? 'active' : ''}
                onClick={() => setActiveLink('products')}
              >
                Products
              </a>
              <a 
                href="/booking" 
                className={activeLink === 'booking' ? 'active' : ''}
                onClick={() => setActiveLink('booking')}
                
              >
                Booking
              </a>
              <a 
                href="/cart" 
                className={activeLink === 'cart' ? 'active' : ''}
                onClick={() => setActiveLink('cart')}
              >
                Cart ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)})
              </a>
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
        <ProductList addToCart={addToCart} />
      </div>
    }
  />
  <Route
    path="/booking"
    element={
      <div className="container bg-white p-4 border-light">
        <h1 className="shop-title">Book <span>Appointment</span></h1>
        <Booking />
      </div>
    }
  />

  <Route
    path="/cart"
    element={
      <div className="container">
        <CartPage 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      </div>
    }
  />
  
  <Route
    path="/success"
    element={
      <div className="container">
        <DonePage />
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

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;