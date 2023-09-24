const { Sequelize,DataTypes, Model } = require("sequelize")
const sequelize = require("../../Services/db/db")
/*const db = new Sequelize('newegg-api', 'root', 'Jose2112*', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});*/
//console.log(sequelize)
class products extends Model{}

const product = products.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    sku:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,        
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    link:{
        type: DataTypes.STRING,
        allowNull:false
    },
    imgUrl:{
        type: DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false,default: 0.0
    },
    category:{
        type: DataTypes.STRING,
        allowNull:true
    },
    desciption:{
        type: DataTypes.STRING(1000),
        allowNull:true
    },
    searchIndex:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{sequelize})

module.exports = product;