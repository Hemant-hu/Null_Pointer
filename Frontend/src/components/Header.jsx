import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  User, 
  Search, 
  Menu, 
  X, 
  Award,
  LogOut,
  Upload
} from 'lucide-react';

const Header = ({ userType = 'worker', isLoggedIn = false, userName = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleUploadVideo = () => {
    navigate('/upload');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              Skill<span className="text-blue-600">Verify</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/workers" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Browse Workers
            </Link>
            <Link 
              to="/contractors" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              For Contractors
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search skills, workers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleUploadVideo}
                  className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Video</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="hidden md:inline text-gray-700">
                      {userName || 'Profile'}
                    </span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50"
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/my-videos"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50"
                      >
                        <Camera className="h-4 w-4" />
                        <span>My Videos</span>
                      </Link>
                      <Link
                        to="/ratings"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50"
                      >
                        <Award className="h-4 w-4" />
                        <span>My Ratings</span>
                      </Link>
                      <hr className="my-2" />
                      <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-red-600 w-full">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t mt-4 pt-4 pb-6">
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search skills, workers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/workers"
                className="block py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Browse Workers
              </Link>
              <Link
                to="/contractors"
                className="block py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                For Contractors
              </Link>
              <Link
                to="/how-it-works"
                className="block py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                How It Works
              </Link>
              
              {isLoggedIn && (
                <>
                  <button
                    onClick={handleUploadVideo}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Video</span>
                  </button>
                  <Link
                    to="/profile"
                    className="block py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-videos"
                    className="block py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    My Videos
                  </Link>
                  <Link
                    to="/ratings"
                    className="block py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    My Ratings
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;