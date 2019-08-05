const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema(
  {
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
    images: [String],
    colors: [String],
    categories: [String],
    genders: [String],
    isDonated: Boolean,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

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
