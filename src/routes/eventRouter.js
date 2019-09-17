const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(authController.protect, eventController.createEvent);

router
  .route('/:id')
  .patch(authController.protect, authController.restrictTo('admin'), eventController.updateEvent)
  .delete(authController.protect, authController.restrictTo('admin'), eventController.deleteEvent);

router.route('/:slug').get(eventController.getEvent);

module.exports = router;
