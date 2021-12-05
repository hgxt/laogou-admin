const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')


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

//sign token
exports.sign = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname,'../keys/rsa_private_key.pem'))
    const token = jwt.sign({username},privateKey,{algorithm:'RS256'})
    return token

}

exports.verify = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname,'../keys/rsa_public_key.pem'))
    const result = jwt.verify(token,publicKey)
    return result

}