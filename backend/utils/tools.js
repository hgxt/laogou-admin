
//密码加密
const bcrypt = require('bcrypt');
const { Promise } = require('mongoose');

exports.hash = (myPlaintextPassword)=>{
    //saltRounds:10  延迟
    return new Promise((resolve,reject) =>{
        bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
            if(err){
                reject(err);
            }else{
                resolve(hash)
            }
        })
    });
}
//登录密码验证
exports.compare = (myPlaintextPassword,hash)=>{
    return new Promise((resolve,reject)=> {
     bcrypt.compare(myPlaintextPassword,hash,function(err,result){
         resolve(result);
     })
    }) 
}