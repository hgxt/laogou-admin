//载入数据库
const {Users} = require('../utils/db');

const findOneUser = (username) => {
    return Users.findOne({username});
}
const signup = ({username,password}) => {
    const users = new Users({
        username,
        password,
    })
    //数据库操作 为异步操作
   return users.save();
    // const result = users.save();
    // console.log(result)//Promise { <pending> }
};

const findList = ()=>{
    return Users.find().sort({_id: -1});
}
const remove = (id)=>{
    console.log(id)
    return Users.findByIdAndRemove(id)
}
exports.signup = signup
exports.findOneUser = findOneUser
exports.findList = findList
exports.remove = remove