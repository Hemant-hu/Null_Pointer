const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    // role: {
    //   type: String,
    //   enum: ["worker", "contractor", "admin"],
    //   required: true
    // },

    // Simple skills array for signup
    skills: {
      type: [String],
      default: []
    },

    // Worker specific profile (can be empty for contractors)
    workerProfile: {
      skillCategory: {
        type: String,
        enum: ["carpenter", "electrician", "plumber", "laborer", "other"]
      },

      experienceYears: {
        type: Number,
        default: 0
      },

      location: {
        city: String,
        state: String
      },

      skillScore: {
        type: String,
        enum: ["Gold", "Silver", "Bronze", "Unverified"],
        default: "Unverified"
      },

      skillScoreValue: {
        type: Number,
        default: 0
      },

      verificationStatus: {
        type: Boolean,
        default: false
      }
    },

    // Uploaded videos by worker
    videos: [
      {
        videoUrl: String,
        taskType: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        },
        evaluation: {
          precisionScore: Number,
          speedScore: Number,
          qualityScore: Number,
          finalScore: Number
        }
      }
    ],

    // Trust indicators
    ratings: {
      averageRating: {
        type: Number,
        default: 0
      },
      totalRatings: {
        type: Number,
        default: 0
      }
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
