const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wallet: {
    type: String,
    required: true,
  },
  // You can also add more fields if needed
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
