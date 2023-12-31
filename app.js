const http = require ('http')
const routes= require('./routes')
const express= require('express')
const bodyParser=require('body-parser')
const path=require('path')
const errors=require('./controllers/errors')
const sequelize=require('./util/database')

const Product=require('./Models/product')
const User=require('./Models/user')
const Cart=require('./Models/cart')
const CartItem=require('./Models/cart-item')

const adminRouter=require('./routes/admin')
const userRouter=require('./routes/shop')

const app= express();

const db=require('./util/database');
const Order = require('./Models/order')
const OrderItem = require('./Models/order-item')

// db.execute('SELECT * from products')
//     .then(res=>{
//         console.log(res[0]);
//     })
//     .catch(err=>{
//         console.log(err);
//     });

app.set('view engine','ejs');
app.set('views','view');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>{
            console.log(err)
        })
})

app.use('/admin',adminRouter);
app.use(userRouter);

app.use(errors.pageNotFound);

//console.log("test")

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})
User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product,{through:OrderItem})

sequelize.sync()
    .then(result=>{
        return User.findByPk(1)
    })
    .then(user=>{
        //console.log(result)
        if(!user)
            return User.create({name:'abc',email:'abc@ghj.com'})
        return user
    })
    .then(user=>{
        return user.getCart().then(cart=>{
        if(cart)
            return cart
        return user.createCart()
        })
    })
    .then(cart=>{

        app.listen('3000')
    })
    .catch(err=>{
        console.log(err)
    })#   P r o d u c t M a n a g e r  
 