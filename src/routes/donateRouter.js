const express = require('express');
const donateController = require('../controllers/donateController');
const authController = require('../controllers/authController');
const interestController = require('../controllers/interestController');

const router = express.Router();

router
  .route('/')
  .get(donateController.getDonates)
  .post(authController.protect, donateController.uploadDonatesImages, donateController.verifyDonatesImages, donateController.createDonate);

router
  .route('/:id')
  .patch(authController.protect, authController.restrictTo('admin'), donateController.updateDonate)
  .delete(authController.protect, authController.restrictTo('admin'), donateController.deleteDonate);

router.route('/:slug').get(donateController.getDonate);
router.route('/:slug/interest').post(authController.protect, interestController.checkExistingInterest, interestController.createInterest);

module.exports = router;
