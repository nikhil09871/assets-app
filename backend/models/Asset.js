// models/assets.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ✅ Use correct model name
    required: true,
  },
  type: { type: String, required: true },
  tokenName: { type: String, required: true },
  value: { type: Number, required: true },
  risk: {
    type: String,
    enum: ['low', 'medium', 'hard'], // ✅ Enum field
    required: true,
  },
});

module.exports = mongoose.model('Asset', assetSchema);
