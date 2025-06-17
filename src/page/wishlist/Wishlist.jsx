import React, { useState } from 'react';
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import './Wishlist.css';
import testPicture from '../../Assets/testpicture.jpg';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      price: '$300,000',
      location: 'New York, NY',
      image: testPicture // Đường dẫn tuyệt đối từ public
    },
    {
      id: 2,
      title: 'Luxury Villa by the Sea',
      price: '$1,200,000',
      location: 'Miami, FL',
      image: testPicture // Đường dẫn tuyệt đối từ public
    },
    {
      id: 3,
      title: 'Cozy House in Suburbs',
      price: '$450,000',
      location: 'Austin, TX',
      image: testPicture // Đường dẫn tuyệt đối từ public
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        {/* Header Banner */}
        <div className="banner">
          <h1>Your Wishlist</h1>
          <p>Manage your favorite properties here.</p>
        </div>

        {/* Wishlist Items */}
        <div className="wishlist-section">
          <h2>Your Favorite Properties</h2>
          {wishlist.length === 0 ? (
            <p className="empty-message">Your wishlist is empty. Start adding properties!</p>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <img src={item.image} alt={item.title} className="wishlist-image" />
                  <div className="wishlist-details">
                    <h3>{item.title}</h3>
                    <p className="wishlist-price">{item.price}</p>
                    <p className="wishlist-location">{item.location}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;