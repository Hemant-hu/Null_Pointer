import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Regi.css';
import { Link } from 'react-router-dom';
import API from '../API/api_req';

const Registration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'worker',
        skills: []
    });

    const [errors, setErrors] = useState({});

    const skillOptions = [
        'Carpentry',
        'Electrical Work',
        'Plumbing',
        'Masonry',
        'Painting',
        'Welding',
        'HVAC',
        'Roofing'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const updatedSkills = checked
                ? [...formData.skills, value]
                : formData.skills.filter(skill => skill !== value);

            setFormData({
                ...formData,
                skills: updatedSkills
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.userType === 'worker' && formData.skills.length === 0) {
            newErrors.skills = 'Please select at least one skill';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            try {
                // Prepare payload
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    userType: formData.userType,
                    skills: formData.skills
                };

                // Send POST request directly
                const res = await API.post("/signup", payload); // <-- here

                // Show backend message
                alert(res.data.message || "Registration successful!");
                navigate("/login");


                // Optional: redirect to login
                // navigate("/login");
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.message || "Signup failed");
                } else {
                    alert("Network error");
                }
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-container">
                <div className="registration-header">
                    <h1>Create Your Account</h1>
                    <p>Join SkillVerify to showcase your skills or find skilled workers</p>
                </div>

                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label>I am a *</label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="userType"
                                    value="worker"
                                    checked={formData.userType === 'worker'}
                                    onChange={handleChange}
                                />
                                <span>Worker</span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="userType"
                                    value="contractor"
                                    checked={formData.userType === 'contractor'}
                                    onChange={handleChange}
                                />
                                <span>Contractor</span>
                            </label>
                        </div>
                    </div>

                    {formData.userType === 'worker' && (
                        <div className="form-group">
                            <label>Your Skills *</label>
                            <div className="skills-grid">
                                {skillOptions.map((skill, index) => (
                                    <label key={index} className="skill-option">
                                        <input
                                            type="checkbox"
                                            name="skills"
                                            value={skill}
                                            checked={formData.skills.includes(skill)}
                                            onChange={handleChange}
                                        />
                                        <span>{skill}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.skills && <span className="error-message">{errors.skills}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <div className="terms-agreement">
                        <label className="checkbox-option">
                            <input type="checkbox" required />
                            <span>
                                I agree to the <a href="/terms">Terms of Service</a> and{' '}
                                <a href="/privacy">Privacy Policy</a>
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="submit-button">
                        Create Account
                    </button>

                    <div className="login-link">
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
