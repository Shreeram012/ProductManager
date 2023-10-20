const express = require('express')
const path=require('path')
const adminController=require('../controllers/admin')
const router=express.Router()
const products=[];

router.get('/add-product',adminController.getAddProduct);
router.get('/products',adminController.getProducts);
router.get('/edit-product/:productID',adminController.getEditProduct);

router.post('/delete-product/:productID',adminController.postDelete)

router.post('/edit-product/:productID',adminController.postEditProduct);
router.post('/add-product',adminController.postAddProducts);
module.exports=router;