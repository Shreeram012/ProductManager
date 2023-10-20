const Product=require('../Models/product');
const Cart=require('../Models/cart');
const { where } = require('sequelize');

exports.getProducts=(req,res,next)=>{
    //console.log("Hi2")
    Product.findAll().then(products=>{
        res.render('shop/product-list',{prod:products,docTitle:'MyShop',path:'/products'});
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getProductByID=(req,res,next)=>{
    const productID=req.params.productID;
    //console.log(productID);

    // Product.findAll({where:{id:productID}})
    //         .then(products=>{
    //             res.render('shop/product-detail',{docTitle:products[0].title,path:'/products',prod:products[0]})
    //         }).catch(err=>{
    //             console.log(err)
    //         })


    Product.findByPk(productID)
            .then(product=>{
                res.render('shop/product-detail',{docTitle:product.title,path:'/products',prod:product})
            })
}
exports.getIndex=(req,res,next)=>{
        //console.log("Hi2")
        Product.findAll().then(products=>{
            res.render('shop/product-list',{prod:products,docTitle:'MyShop',path:'/'})
        })
        .catch(err=>{
            console.log(err)
        })
    
}

exports.getCart=(req,res,next)=>{
    req.user.getCart().then(cart=>{
        return cart.getProducts()
                    .then(products=>{
                        res.render('shop/cart',{
                    path:'/cart',
                    docTitle:'Cart',
                    products:products
                        })
                    })
    }).catch(err=>{
        console.log(err)
    })
}

exports.postCart=(req,res,next)=>{
    const url=req.url.toString();
    const arr=url.split('products/')
    const productID=arr[1];
    let fetchedCart;
    req.user.getCart()
            .then(cart=>{
                fetchedCart=cart;
                return cart.getProducts({where:{id:productID}})
            })
            .then(products=>{
                let product;
                if(products.length>0){
                    product=products[0];
                }
            
                let newQty=1;
                if(product){
                    const oldqty=product.cartItem.qty;
                    newQty=oldqty+1;
                }
                return Product.findByPk(productID).then(product=>{
                    return fetchedCart.addProduct(product,{through:{qty:newQty}})
                })
                .then(res.redirect('/cart'))
                .catch()
            })
    
}

exports.postDeleteCart=(req,res,next)=>{
    const url=req.url.toString();
    const arr=url.split('item/')
    const productID=arr[1];
    console.log(productID)
    req.user.getCart()
            .then(cart=>{
                return cart.getProducts({where:{id:productID}})
            })
            .then(products=>{
                const product=products[0];
                return product.cartItem.destroy();
            })
            .then(result=>{
                res.redirect('/cart')
            }).catch(err=>{
                console.log(err)
            })
}

exports.postCreateOrders=(req,res,next)=>{
    let fetchedCart;
    req.user.getCart()
            .then(cart=>{
                fetchedCart=cart
                return cart.getProducts()
            })
            .then(products=>{
                return req.user.createOrder()
                                .then(order=>{
                                    order.addProducts(products.map(product=>{
                                        product.orderItem={qty:product.cartItem.qty}
                                        return product
                                    }))
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
            })
            .then(result=>{
                fetchedCart.setProducts(null)
            })
            .then(result => {
                res.redirect('/orders')
            })
            .catch(err=>{console.log(err)})
}

exports.getOrders=(req,res,next)=>{
    req.user.getOrders({include:['products']})
            .then(orders=>{
                res.render('shop/orders',{docTitle:'MyShop',path:'/orders',orders:orders})
            })
            .catch(err=>{
                console.log(err)
            })

}

exports.getCheckout=(req,res,next)=>{
    //console.log("Hi2")
    Product.fetchAll(products=>{
        res.render('shop/checkout',{prod:products,docTitle:'MyShop',path:'/checkout'})
        //console.log(products)
    });

}