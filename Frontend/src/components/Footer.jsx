import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Camera className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">
                Skill<span className="text-blue-400">Verify</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Transforming blue-collar hiring through video-based skill verification. 
              Empowering workers and contractors with trusted digital skill identities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/workers" className="text-gray-400 hover:text-white transition-colors">
                  Browse Workers
                </Link>
              </li>
              <li>
                <Link to="/contractors" className="text-gray-400 hover:text-white transition-colors">
                  For Contractors
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Skill Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/carpentry" className="text-gray-400 hover:text-white transition-colors">
                  Carpentry
                </Link>
              </li>
              <li>
                <Link to="/category/electrical" className="text-gray-400 hover:text-white transition-colors">
                  Electrical Work
                </Link>
              </li>
              <li>
                <Link to="/category/plumbing" className="text-gray-400 hover:text-white transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/category/masonry" className="text-gray-400 hover:text-white transition-colors">
                  Masonry
                </Link>
              </li>
              <li>
                <Link to="/category/painting" className="text-gray-400 hover:text-white transition-colors">
                  Painting
                </Link>
              </li>
              <li>
                <Link to="/category/welding" className="text-gray-400 hover:text-white transition-colors">
                  Welding
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400">support@skillverify.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400">
                  123 Skill Street<br />
                  Tech City, TC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} SkillVerify. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;