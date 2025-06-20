const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String },

  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },

  phoneNo: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  dob: { type: Date, required: true },

  // Linked fields from UserSubCategory
  gender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  sexuality: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  religion: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  zodiacSign: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  bodyType: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  language: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' }],
  smoking: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  drinking: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  salary: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  relationshipStatus: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' },
  hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSubCategory' }],

  companyName: { type: String, trim: true },

  photo: {
    type: [String],
    default: [],
    validate: {
      validator: function (photos) {
        return Array.isArray(photos) && photos.length >= 2 && photos.length <= 6;
      },
      message: 'You must upload at least 2 and at most 6 photos.'
    }
  }

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
