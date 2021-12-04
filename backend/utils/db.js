//连接数据库 lagou-admin
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//users(用户)
//Schema
var usersSchema = mongoose.Schema({
    username: String,
    password:String,
  });
//model:类   mongodb中的collection名字users，会自动为复数形式
var Users = mongoose.model('users', usersSchema);

exports.Users =Users






