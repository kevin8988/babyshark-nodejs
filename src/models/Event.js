const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
  day: {
    type: Date,
    required: [true, 'A donate must have a day']
  },
  hour: {
    type: Date,
    required: [true, 'A donate must have a hour']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
