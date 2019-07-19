const express = require('express');
const donateController = require('../controllers/DonateController');

const router = express.Router();

router
  .route('/')
  .get(donateController.getAllDonates)
  .post(donateController.createDonate);

router
  .route('/:id')
  .get(donateController.getDonate)
  .patch(donateController.updateDonate)
  .delete(donateController.deleteDonate);

module.exports = router;
