const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

userSchema.virtual('donates', {
  ref: 'Donate',
  foreignField: 'user',
  localField: '_id'
});

userSchema.pre(/^find/, function(next) {
  this.populate('donates');
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
