import React, { useState, useEffect } from "react";
import './navbar.css';
import Logo from '../../Assets/Logo.svg';
import { Link } from "react-router-dom";
import '../../Assets/Asset/Reset.css'
import '../../Assets/Asset/Global.css'
import UserAvatar from '../header/UserAvatar'; // Đảm bảo đường dẫn đúng

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu người dùng từ localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                // Kiểm tra nếu dữ liệu có thể parse thành JSON hợp lệ
                setUser(JSON.parse(userData));
            } catch (e) {
                console.error("Error parsing user data from localStorage:", e);
                setUser(null); // Nếu không thể parse, đặt user thành null
            }
        }
    }, []);


    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <a href="/" className="logo">
                        <div className="logo-icon">
                            <img src={Logo} alt="Logo" />
                        </div>
                    </a>

                    {/* Navigation Menu */}
                    <nav className="navigation">
                        <Link to="/" className="nav-item">
                            <span>Home</span>

                        </Link>
                        <Link to="/listings" className="nav-item">
                            <span>Listings</span>

                        </Link>
                        <Link to="/members" className="nav-item">
                            <span>Members</span>

                        </Link>
                        <Link to="/blog" className="nav-item">
                            <span>Blog</span>

                        </Link>
                        <Link to="/pages" className="nav-item">
                            <span>Pages</span>

                        </Link>
                        <Link to="/contact" className="nav-item-simple">
                            <span>Contact</span>
                        </Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="actions">

                        <button className="add-property-button">
                            Sign-In
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );

};

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> 6bcec0024595667a51e5731dd3bbbe567ed7877c
