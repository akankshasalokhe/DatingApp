const express = require('express');
const { registerController,loginController,getUserController,getAllUsersController,deleteUserController,updateUserController } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerController);
// router.post('/login/send-otp', sendOtpController);
// router.post('/login/verify-otp', verifyOtpLoginController);
router.post('/login',loginController)
router.get('/getUserbyId/:id', getUserController);
router.get('/getAllusers', getAllUsersController);
router.delete('/delete/:id', deleteUserController);
router.put('/update/:id', updateUserController);

module.exports = router;

