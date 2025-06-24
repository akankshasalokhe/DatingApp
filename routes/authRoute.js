const express = require('express');
const { registerController,loginController,getSingleUserController,getAllUsersController,deleteUserController,updateUserController,publicKeyController } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerController);
// router.post('/login/send-otp', sendOtpController);
// router.post('/login/verify-otp', verifyOtpLoginController);
router.post('/login',loginController)
router.get('/getUserbyId/:id', getSingleUserController);
router.get('/getAllusers', getAllUsersController);
router.delete('/delete/:id', deleteUserController);
router.put('/update/:id', updateUserController);
router.put('/public-key',publicKeyController)

module.exports = router;

