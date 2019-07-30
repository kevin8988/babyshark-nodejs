const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A donate must have a title'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'A donate must have a summary'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A donate must have a description'],
    trim: true
  },
  information: {
    type: String,
    required: [true, 'A donate must have a informations'],
    trim: true
  },
  images: [
    {
      type: String,
      required: [true, 'A donate must have a image'],
      trim: true
    }
  ],
  colors: [
    {
      type: String,
      required: [true, 'A donate must have a color'],
      trim: true
    }
  ],
  categories: [
    {
      type: String,
      required: [true, 'A donate must have a category'],
      trim: true
    }
  ],
  genders: [
    {
      type: String,
      required: [true, 'A donate must have a gender'],
      trim: true
    }
  ],
  isDonated: Boolean,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

donateSchema.pre('save', function(next) {
  this.isDonated = false;
  next();
});

donateSchema.pre(/^find/, function(next) {
  this.find({ isDonated: { $ne: true } });
  next();
});

const Donate = mongoose.model('Donate', donateSchema);

module.exports = Donate;
