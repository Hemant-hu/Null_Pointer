import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Upload, 
  Award, 
  Clock, 
  Users, 
  CheckCircle,
  TrendingUp,
  Star,
  Zap,
  Shield
} from 'lucide-react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const fileInputRef = useRef(null);

  // Sample worker data
  const sampleWorkers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      skill: 'Carpentry',
      rating: 'Gold',
      score: 92,
      location: 'Mumbai',
      experience: '8 years',
      videoThumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
      skills: ['Furniture Making', 'Cabinet Installation', 'Wood Carving']
    },
    {
      id: 2,
      name: 'Amit Sharma',
      skill: 'Electrical',
      rating: 'Silver',
      score: 78,
      location: 'Delhi',
      experience: '5 years',
      videoThumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4',
      skills: ['Wiring', 'Panel Installation', 'Troubleshooting']
    },
    {
      id: 3,
      name: 'Suresh Patel',
      skill: 'Plumbing',
      rating: 'Bronze',
      score: 65,
      location: 'Bangalore',
      experience: '3 years',
      videoThumbnail: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39',
      skills: ['Pipe Fitting', 'Leak Repair', 'Installation']
    },
    {
      id: 4,
      name: 'Vikram Singh',
      skill: 'Masonry',
      rating: 'Gold',
      score: 88,
      location: 'Chennai',
      experience: '10 years',
      videoThumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      skills: ['Brick Work', 'Concrete', 'Tiling']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'carpentry', label: 'Carpentry' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'masonry', label: 'Masonry' },
    { id: 'painting', label: 'Painting' },
    { id: 'welding', label: 'Welding' }
  ];

  const ratingLevels = [
    { id: 'all', label: 'All Ratings', color: 'text-gray-600' },
    { id: 'gold', label: 'Gold', color: 'text-yellow-500' },
    { id: 'silver', label: 'Silver', color: 'text-gray-400' },
    { id: 'bronze', label: 'Bronze', color: 'text-amber-800' }
  ];

  const filteredWorkers = sampleWorkers.filter(worker => {
    const categoryMatch = selectedCategory === 'all' || 
      worker.skill.toLowerCase().includes(selectedCategory);
    const ratingMatch = ratingFilter === 'all' || 
      worker.rating.toLowerCase() === ratingFilter;
    return categoryMatch && ratingMatch;
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle video upload logic here
      console.log('Selected file:', file);
      // You would typically upload to your backend here
    }
  };

  const getRatingColor = (rating) => {
    switch (rating.toLowerCase()) {
      case 'gold': return 'bg-yellow-500 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'bronze': return 'bg-amber-800 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Verify Skills, Build Trust
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Video-based skill verification platform for blue-collar workers. 
              Show your real skills, get certified, and find better opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Your Skills</span>
              </Link>
              <Link
                to="/workers"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Find Skilled Workers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Upload Video</h3>
              <p className="text-gray-600">
                Record and upload a short video demonstrating your skills in action
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Get Verified</h3>
              <p className="text-gray-600">
                Our AI analyzes quality, precision, and speed to assign a Skill Score
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Hired</h3>
              <p className="text-gray-600">
                Contractors trust verified scores and hire with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Comparison & Rating Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Compare & Rate Skills</h2>
              <p className="text-gray-600 max-w-2xl">
                Watch skill demonstration videos, compare techniques, and view AI-generated ratings 
                based on precision, speed, and quality metrics.
              </p>
            </div>
            
            {/* Upload Button */}
            <button
              onClick={handleUploadClick}
              className="mt-4 lg:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Video for Rating</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-semibold mb-3">Filter by Skill</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="md:w-64">
                <h3 className="font-semibold mb-3">Filter by Rating</h3>
                <div className="flex flex-wrap gap-2">
                  {ratingLevels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setRatingFilter(level.id)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        ratingFilter === level.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block mr-2 ${level.color}`}>
                        ●
                      </span>
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWorkers.map(worker => (
              <div key={worker.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Video Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={worker.videoThumbnail}
                    alt={worker.skill}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(worker.rating)}`}>
                      {worker.rating}
                    </span>
                  </div>
                </div>

                {/* Worker Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{worker.name}</h3>
                      <p className="text-gray-600">{worker.skill}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {worker.score}%
                      </div>
                      <div className="text-sm text-gray-500">Skill Score</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{worker.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{worker.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-2">
                    <Link
                      to={`/worker/${worker.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No workers found with the selected filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why SkillVerify?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Higher Earnings</h3>
              <p className="text-gray-600">
                Verified skills command better pay and more job opportunities
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <Shield className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust & Credibility</h3>
              <p className="text-gray-600">
                Digital skill identity builds trust with contractors
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <Star className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fair Assessment</h3>
              <p className="text-gray-600">
                AI-powered unbiased evaluation of practical skills
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <Zap className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fast Hiring</h3>
              <p className="text-gray-600">
                Contractors hire skilled workers quickly without lengthy interviews
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;