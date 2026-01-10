import React from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    // ✅ Get email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    const profile = () => {

        navigate("/profile");
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">

                    {/* Logo */}
                    <a href="/" className="logo-link">
                        <div className="logo-icon">
                            <span>SV</span>
                        </div>
                        <span className="logo-text">
                            Skill<span className="logo-highlight">Verify</span>
                        </span>
                    </a>

                    {/* Navigation */}
                    <nav className="nav-desktop">
                        <a href="/workers" className="nav-link">Workers</a>
                        <a href="/upload" className="nav-link">Upload</a>
                        <a href="/how-it-works" className="nav-link">How it Works</a>
                    </nav>

                    {/* Auth Section */}
                    <div className="auth-container">
                        {!userEmail ? (
                            <>
                                <a href="/login" className="login-link">Login</a>
                                <a href="/signup" className="signup-button">Sign Up</a>
                            </>
                        ) : (
                            <>
                                <span className="user-email">
                                    {userEmail}
                                </span>  <button onClick={profile} className="profile-button">
                                    Profile
                                </button>
                                <button onClick={handleLogout} className="logout-button">
                                    Logout
                                </button>
                              
                            </>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
