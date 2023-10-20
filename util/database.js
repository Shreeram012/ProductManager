const Sequelize=require('sequelize').Sequelize;
const sequelize=new Sequelize('shop_schema','root','abcd123',{dialect:'mysql',host:'localhost'})

module.exports=sequelize;

