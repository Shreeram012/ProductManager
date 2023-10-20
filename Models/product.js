const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageurl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:Sequelize.STRING
})

module.exports=Product;