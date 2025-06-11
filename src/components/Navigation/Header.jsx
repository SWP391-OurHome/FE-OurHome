import React, { useState, useEffect } from "react";
import './navbar.css';
import Logo from '../../Assets/Logo.svg';
import { Link } from "react-router-dom";
import '../../Assets/Asset/Reset.css';
import '../../Assets/Asset/Global.css';
import UserAvatar from '../header/UserAvatar';

const Header = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const userRole = localStorage.getItem("role");

        if (userData) {
            try {
                setUser(JSON.parse(userData));
                setRole(userRole?.toLowerCase());
            } catch (e) {
                console.error("Error parsing user data from localStorage:", e);
                setUser(null);
                setRole(null);
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
                        <Link to="/" className="nav-item"><span>Home</span></Link>
                        <Link to="/listings" className="nav-item"><span>Listings</span></Link>
                        <Link to="/members" className="nav-item"><span>Members</span></Link>
                        <Link to="/blog" className="nav-item"><span>Blog</span></Link>
                        <Link to="/pages" className="nav-item"><span>Pages</span></Link>
                        <Link to="/contact" className="nav-item-simple"><span>Contact</span></Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="actions">
                        {user && role === "customer" ? (
                            <UserAvatar />
                        ) : (
                            <Link to="/login">
                                <button className="add-property-button">Sign-In</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
