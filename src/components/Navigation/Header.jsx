import './navbar.css';
import Logo from '../../Assets/Logo.svg';
import { Link } from "react-router-dom";

const Header = () => {
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

                    {/* Navigation */}
                    <nav className="navigation">
                        <a href="/" className="nav-link">
                            Home
                        </a>
                        <a href="/For Sale" className="nav-link">
                            For Sale
                        </a>
                        <a href="/For Rent" className="nav-link">
                            For Rent
                        </a>
                        <Link to="/Sign-In" className="nav-link">
                            Sign-In
                        </Link>
                        <a href="/signup" className="nav-link">
                            SignUp
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <button className="mobile-menu-btn">
                        <img src={Logo} alt="Logo" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
