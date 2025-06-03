import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import 'bootstrap-icons/font/bootstrap-icons.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <div className="logo">FLEX LIVING</div>
                    <p>Contact number: 02033074477</p>
                    <div className="social-icons">
                    <i class="bi bi-instagram"></i>
                    <i class="bi bi-facebook"></i>
                    <i class="bi bi-twitter"></i>
                    </div>
                    <p>© 2021 Flex Living</p>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Company</h4>
                        <a href="#">Home</a>
                        <a href="#">About us</a>
                        <a href="#">Our team</a>
                    </div>
                    <div className="footer-column">
                        <h4>Guests</h4>
                        <a href="#">Blog</a>
                        <a href="#">FAQ</a>
                        <a href="#">Career</a>
                    </div>
                    <div className="footer-column">
                        <h4>Privacy</h4>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer-subscribe">
                    <h4>Stay up to date</h4>
                    <p>Be the first to know about our newest apartments</p>
                    <input type="email" placeholder="Email address" />
                    <button>Subscribe</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
