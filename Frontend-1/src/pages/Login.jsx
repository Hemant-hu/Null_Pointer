import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:3000" // Change to your backend URL
});

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Simple validation function
    // const validateForm = () => {
    //     const newErrors = {};
    //     if (!formData.email) newErrors.email = "Email is required";
    //     else if (!/\S+@\S+\.\S+/.test(formData.email))
    //         newErrors.email = "Enter a valid email";

    //     if (!formData.password) newErrors.password = "Password is required";
    //     else if (formData.password.length < 6)
    //         newErrors.password = "Password must be at least 6 characters";

    //     return newErrors;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const validationErrors = validateForm();

        const response = await API.post("/login", {
            email: formData.email,
            password: formData.password
        });

        setIsLoading(false);

        // Backend should return success message or token
            localStorage.setItem("userEmail", response.data.email);
        alert(response.data.message + response.data.email || "Login successful!");

        // Redirect to dashboard or home page after login
        navigate("/dashboard");
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const email = prompt('Please enter your email address to reset password:');
        if (email && /\S+@\S+\.\S+/.test(email)) {
            alert(`Password reset link sent to ${email}`);
        } else if (email) {
            alert('Please enter a valid email address');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your SkillVerify account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.password ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    <div className="form-options">
                        <label className="checkbox-option">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <span>Remember me</span>
                        </label>

                        <a href="#" className="forgot-password" onClick={handleForgotPassword}>
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-button google">
                            Google
                        </button>

                        <button type="button" className="social-button github">
                            GitHub
                        </button>
                    </div>

                    <div className="register-link">
                        Don't have an account? <Link to="/register">Sign up here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
