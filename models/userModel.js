const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String },

  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },

  phoneNo: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10,15}$/, 'Please enter a valid phone number']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  dob: { type: Date, required: true },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },

  lookingFor: {
    type: String,
    enum: [
      'Friendship', 'Dating', 'Long-term', 'Chat', 'Marriage', 'Other',
      'Short-term', 'Situationship', 'Fun', 'Living', 'Still figuring it out'
    ]
  },

  hobbies: [{
    type: String,
    enum: [
      'Swimming', 'Playing Chess', 'Playing Games', 'Dancing',
      'Football', 'Riding', 'Camping', 'Photography',
      'Music', 'Movies', 'Other'
    ]
  }],

  hangoutSpots: [{
    type: String,
    enum: [
      'Gaming Room', 'Cloud 9', 'Bedroom', 'Cafe meme', 'Starbucks',
      'Long-Drive', 'Silent place', '2BHK', 'Monsoon place', 'Camping', 'Other'
    ]
  }],

  relationshipStatus: {
    type: String,
    enum: ['Single', 'In a Relationship', 'Married', 'Divorced', 'Widowed', 'Engaged']
  },

  education: {
    type: String,
    enum: ['High School', 'Bachelors', 'Masters', 'PhD']
  },

  companyName: { type: String, trim: true },

  salary: {
    type: String,
    enum: ['Less than 10', '10-20', '20-50', '50 or more', 'Do not discuss']
  },

  photo: {
    type: [String],
    default: [],
    validate: {
      validator: function (photos) {
        return Array.isArray(photos) && photos.length >= 2 && photos.length <= 6;
      },
      message: 'You must upload at least 2 and at most 6 photos.'
    }
  },

  // otp: { type: String }
}, { timestamps: true });

// Automatically generate userId based on _id
// userSchema.pre('save', function (next) {
//   if (!this.userId) {
//     this.userId = `UID_${this._id.toString().slice(-6).toUpperCase()}`;
//   }
//   next();
// });

// // Indexes for faster querying
// userSchema.index({ email: 1 });
// userSchema.index({ phoneNo: 1 });

module.exports = mongoose.model('User', userSchema);
