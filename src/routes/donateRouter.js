const express = require('express');
const donateController = require('../controllers/donateController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(donateController.getDonates)
  .post(authController.protect, donateController.createDonate);

router
  .route('/:id')
  .get(donateController.getDonate)
  .patch(authController.protect, authController.restrictTo('admin'), donateController.updateDonate)
  .delete(authController.protect, authController.restrictTo('admin'), donateController.deleteDonate);

module.exports = router;
