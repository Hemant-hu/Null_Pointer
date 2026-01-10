import React, { useEffect, useState } from "react";
import API from "../API/api_req";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!email) return;

        const fetchProfile = async () => {
            try {
                const res = await API.get(`/profile?email=${email}`);
                setUser(res.data);
                setEditData(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [email]);

    if (loading) return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading Profile...</div>
                </div>
            </div>
        </div>
    );

    if (!user) return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2 className="error-title">Profile Not Found</h2>
                    <p className="error-message">Please log in to view your profile.</p>
                    <button
                        className="action-button edit-button"
                        onClick={() => window.location.href = "/login"}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );

    // Calculate stats (you can customize these based on your data)
    const userStats = [
        { value: user.skills?.length || 0, label: "Skills" },
        { value: "Gold", label: "Rating" },
        { value: "98%", label: "Score" }
    ];

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-card glass-card">
                    {/* Profile Header */}
                    <div className="profile-header">
                        <div className="profile-title">
                            <h1>{user.name}</h1>
                            <div className="profile-subtitle">
                                Professional {user.userType === 'worker' ? 'Worker' : 'Contractor'}
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="profile-content">
                        {/* Personal Information Section */}
                        <div className="profile-section shine-effect">
                            <h2 className="section-title">Personal Information</h2>
                            <div className="profile-info">
                                <div className="info-row floating">
                                    <span className="info-label name">Full Name</span>
                                    <span className="info-value">{user.name}</span>
                                </div>

                                <div className="info-row floating">
                                    <span className="info-label email">Email Address</span>
                                    <span className="info-value">{user.email}</span>
                                </div>

                                <div className="info-row floating">
                                    <span className="info-label phone">Phone Number</span>
                                    <span className={`info-value ${!user.phone ? 'no-phone' : ''}`}>
                                        {user.phone || "Not provided"}
                                    </span>
                                </div>

                                <div className="info-row floating">
                                    <span className="info-label type">User Type</span>
                                    <span className={`user-type-badge badge-${user.userType}`}>
                                        {user.userType}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="skills-section shine-effect">
                            <h2 className="section-title">Skills & Expertise</h2>
                            <div className="skills-list">
                                {user.skills && user.skills.length > 0 ? (
                                    user.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <div className="no-skills">
                                        No skills added yet. Add your skills to get better job matches!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Stats */}
                    {/* <div className="profile-stats">
                        {userStats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div> */}

                    {/* Profile Actions */}
                    <div className="profile-actions">
                        <button
                            className="action-button edit-button"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>

                        <button
                            className="action-button logout-button"
                            onClick={() => {
                                localStorage.removeItem("userEmail");
                                window.location.href = "/login";
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;