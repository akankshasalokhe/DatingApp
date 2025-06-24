const express = require('express');
const router = express.Router();
const { createUserSubCategoryController, getAllUserSubCategoriesController, getUserSubCategoryByIdController, updateUserSubCategoryController, deleteUserSubCategoryController } = require('../controllers/userSubCategoriesController');

router.post('/CreateSubCategory', createUserSubCategoryController);
router.get('/getAllSubCategories', getAllUserSubCategoriesController);
router.get('/getsubCategorybyId/:id', getUserSubCategoryByIdController);
router.put('/updateSubCategory/:id', updateUserSubCategoryController);
router.delete('/deleteSubCategory/:id', deleteUserSubCategoryController);

module.exports = router;
