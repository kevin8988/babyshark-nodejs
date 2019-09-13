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
router.route('/:slug/interest').post(authController.protect, interestController.checkIfIsNotMyDonate, interestController.checkExistingInterest, interestController.createInterest);
router.route('/:slug/interest/:id/accept').post(authController.protect, interestController.checkIfIsMyInterest, interestController.acceptInterest);
router.route('/:slug/interest/:id/decline').post(authController.protect, interestController.checkIfIsMyInterest, interestController.declineInterest);

module.exports = router;
