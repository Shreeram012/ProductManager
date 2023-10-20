const Product=require('../Models/product');

exports.getAddProduct=(req,res,next)=>{
    //console.log("HI")
    res.render('admin/edit-product',{docTitle:'Add product',path:'/admin/add-product',editing:false});
}

exports.postAddProducts=(req,res,next)=>{
    //console.log("HI")
    const title=req.body.title,
          imageURL=req.body.imageurl,
          price=req.body.price,
          description=req.body.description;
    //console.log(description)
    req.user.createProduct({
        title:title,
        imageurl:imageURL,
        price:price,
        description:description
    }).
        then(result=>{
            res.redirect('/admin/products')
            console.log("created")
        })
        .catch(err=>{
            console.log(err)
        })
    
}

exports.getEditProduct=(req,res,next)=>{
    //console.log("HI")
    const editMode=req.query.edit;
    const prodID=req.params.productID;

    req.user.getProducts({where:{id:prodID}})
    //Product.findByPk(prodID)
        .then(products=>{
            const product=products[0]
            res.render('admin/edit-product',{docTitle:'Edit product',path:'/admin/edit-product',editing:editMode,product:product});
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.postDelete=(req,res,next)=>{
    const del=req.query.del;
    if(del){
        const id=req.params.productID;
        Product.findByPk(id)
            .then(product=>{
                return product.destroy()
            })
            .then(result=>{
                console.log("deleted")
            })
            .catch(err=>{
                console.log(err)
            })
    }
    res.redirect('/admin/products')
}

exports.postEditProduct=(req,res,next)=>{
    const id=req.params.productID;
    console.log(id);
    const title=req.body.title,
          imageURL=req.body.imageurl,
          price=req.body.price,
          description=req.body.description;
    Product.findByPk(id)
        .then(product=>{
            product.title=title;
            product.imageurl=imageURL;
            product.price=price;
            product.description=description;
            return product.save()
        })
        .then(result=>{
            console.log('Updated!')
            res.redirect('/')
        })
        .catch(err=>{
            console.log(err)
        })
    
}

exports.getProducts=(req,res,next)=>{
    //console.log("HI")

    Product.findAll()
        .then(products=>{
            res.render('admin/product-list',{prod:products,docTitle:'MyShop',path:'/admin/products'})
        })
        .catch(err=>{
            console.log(err)
        })
}

