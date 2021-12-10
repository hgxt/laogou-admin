//连接数据库 lagou-admin
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//构建users(用户)的model
//Schema
var usersSchema = mongoose.Schema({
    username: String,
    password:String,
  });
//model:类   mongodb中的collection名字users，会自动为复数形式
var Users = mongoose.model('users', usersSchema);

//构建positions（职位）的model
var positionsSchema = mongoose.Schema({
  companyLogo:String,
  companyName: String,
  positionName:String,
  city:String,
  createTime:String,
  salary:String
})

//model
var Positions = mongoose.model('positions',positionsSchema)

exports.Users =Users
exports.Positions = Positions







