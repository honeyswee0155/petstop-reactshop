/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaCalendarCheck, FaEnvelope, FaLock, FaSignInAlt, FaUser } from 'react-icons/fa';
import './Booking.css'; // We'll create this next

const Booking = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    guestEmail: '',
    phone: '',
    pet: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="booking-container">
      <header className="booking-header">
        <h1><FaCalendarCheck /> Book an Appointment</h1>
        <p>Schedule a visit for your pet with our professional team</p>
      </header>

      <div className="container">
        <div className="auth-section">
          <button 
            onClick={() => setShowLogin(true)} 
            className={showLogin ? 'active' : ''}
          >
            Member Login
          </button>
          <button 
            onClick={() => setShowLogin(false)} 
            className={!showLogin ? 'active' : ''}
          >
            Continue as Guest
          </button>
        </div>

        {showLogin ? (
          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email"><FaEnvelope /> Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            
            <label htmlFor="password"><FaLock /> Password</label>
            <input 
              type="password" 
              id="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            
            <button type="submit" className="submit-btn"><FaSignInAlt /> Login</button>
            
            <p>Don't have an account? <a href="#">Register here</a></p>
          </form>
        ) : (
          <form id="guest-form" onSubmit={handleSubmit}>
            <h2><FaUser /> Owner & Pet Details</h2>
            
            <label htmlFor="fullname">Full Name</label>
            <input 
              type="text" 
              id="fullname" 
              placeholder="Your full name" 
              value={formData.fullname}
              onChange={handleChange}
              required 
            />
            
            <label htmlFor="guestEmail">Email Address</label>
            <input 
              type="email" 
              id="guestEmail" 
              placeholder="your@email.com" 
              value={formData.guestEmail}
              onChange={handleChange}
              required 
            />
            
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="Your phone number" 
              value={formData.phone}
              onChange={handleChange}
              required 
            />
            
            <label htmlFor="pet">Pet Type</label>
            <select 
              id="pet" 
              value={formData.pet}
              onChange={handleChange}
              required
            >
              <option value="">--Select--</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
            </select>
            
            <label htmlFor="date">Preferred Date</label>
            <input 
              type="date" 
              id="date" 
              value={formData.date}
              onChange={handleChange}
              required 
            />
            
            <label htmlFor="time">Preferred Time</label>
            <input 
              type="time" 
              id="time" 
              value={formData.time}
              onChange={handleChange}
              required 
            />
            
            <button type="submit" className="submit-btn">Book Appointment</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;