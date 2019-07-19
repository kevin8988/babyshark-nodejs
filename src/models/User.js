const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A donate must have a first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'A donate must have a last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'A donate must have a email'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'A donate must have a password'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
