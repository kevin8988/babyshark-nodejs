const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/me').get(authController.protect, userController.getMe, userController.getUser);
router.route('/me/donates').get(authController.protect, userController.getMyDonates);
router.route('/me/donates/interests').get(authController.protect, userController.getMyDonatesInterests);
router.route('/me/events').get(authController.protect, userController.getMyEvents);
router.route('/me/interests').get(authController.protect, userController.getMyInterests);

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
