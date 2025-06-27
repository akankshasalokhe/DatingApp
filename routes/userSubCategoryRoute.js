const express = require('express');
const router = express.Router();
const { createUserSubCategoryController, getAllUserSubCategoriesController, getUserSubCategoryByIdController, updateUserSubCategoryController, deleteUserSubCategoryController } = require('../controllers/userSubCategoriesController');
const upload = require('../middlewares/upload');


router.post('/user-subcategory', upload.single('image'), createUserSubCategoryController);
router.get('/getAllSubCategories', getAllUserSubCategoriesController);
router.get('/getsubCategorybyId/:id', getUserSubCategoryByIdController);
router.put('/updateSubCategory/:id', updateUserSubCategoryController);
router.delete('/deleteSubCategory/:id', deleteUserSubCategoryController);

module.exports = router;
