
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:{type:String},
  userId: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phoneNo: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  dob: { type: Date, required: true },
  age: { type: Number },

  sexualOrientation: {
    type: String,
    enum: ['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Asexual', 'Other'],
  },
  customSexualOrientation: { type: String },

  location: { type: String },
  jobTitle: { type: String },

  salary: {
    type: String,
    enum: ['less than 10', '10-20', '20-50', '50 or more', 'Do not discuss'],
  },
  companyName: { type: String },
  education: {
    type: String,
    enum: ['High School', 'Bachelors', 'Masters', 'PhD'],
  },

  hobbies: [{
    type: String,
    enum: [
      'Swimming', 'Playing Chess', 'Playing Games', 'Dancing',
      'Football', 'Riding', 'Camping', 'Photo Graphy', 'Music', 'Movies', 'Other'
    ]
  }],
  customHobbies: [{ type: String }],

  hangoutSpots: [{
    type: String,
    enum: [
      'Gaming Room', 'Cloud 9', 'Bedroom', 'Cafe meme', 'Starbucks',
      'Long-Drive', 'Silent place', '2BHK', 'Mansoon place', 'Camping', 'Other'
    ]
  }],
  customHangoutSpots: [{ type: String }],

  relationshipStatus: {
    type: String,
    enum: ['Single', 'In a Relationship', 'Married', 'Divorced', 'Widowed', 'Engaged'],
  },

photo: {
  type: [String], // array of image URLs or file paths
  validate: {
    validator: function (photos) {
      return photos.length >= 2 && photos.length <= 6;
    },
    message: 'You must upload at least 2 and at most 6 photos.'
  }
},
  height: { type: String },

  bodyType: {
    type: String,
    enum: ['Slim', 'Average', 'Athletic', 'Heavy', 'Other'],
  },
  customBodyType: { type: String },

  religion: { type: String },
  language: [{ type: String }],

  smoking: {
    type: String,
    enum: ['Yes', 'No', 'Occasionally'],
  },
  drinking: {
    type: String,
    enum: ['Yes', 'No', 'Socially'],
  },
  pets: {
    type: String,
    enum: ['Yes', 'No', 'Like them', 'Allergic'],
  },
  kids: {
    type: String,
    enum: ['Yes', 'No', 'Maybe someday'],
  },
  zodiacSign: {
    type: String,
    enum: [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ],
  },

  otp: { type: String },

  lookingFor: {
    type: String,
    enum: [
      'Friendship', 'Dating', 'Long-term', 'Chat', 'Marriage', 'Other',
      'short-term', 'Situationship', 'Fun', 'Living', 'Still figuring it out'
    ]
  },
  customLookingFor: { type: String },

  interestedInGender: [{
    type: String,
    enum: ['Male', 'Female', 'Beyond Secondary', 'Other']
  }],
  customInterestedInGender: [{ type: String }],

  ageRangePreference: {
    min: { type: Number },
    max: { type: Number },
  },
  locationPreference: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
