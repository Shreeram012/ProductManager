const express = require('express');
const { route } = require('./admin');
const path=require('path');
const root=require('../util/root')
const admin=require('./admin')
const productController=require('../controllers/products')

const router=express.Router()

router.get('/',productController.getIndex);
router.get('/cart',productController.getCart);
router.post('/cart-delete-item/:productID',productController.postDeleteCart);
router.post('/products/:productID',productController.postCart);
router.get('/orders',productController.getOrders);
router.get('/products',productController.getProducts);
router.get('/products/:productID',productController.getProductByID)
router.post('/create-order',productController.postCreateOrders)
router.get('/checkout',productController.getCheckout);


module.exports=router