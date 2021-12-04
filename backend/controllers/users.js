//载入ejs模板，不用写
// const succTPL = require('../views/succ.ejs')

//载入数据库
const usersModel = require('../models/users')

const {hash,compare} = require('../utils/tools')

// const randomstring = require('randomstring')

//载入路由

//用户登录
const signin = async (req,res,next) => {
    const { username,password } = req.body;
    //验证用户名是否存在并合法
    let result = await usersModel.findOneUser(username);
    if(result){
        //取别名,判断密码是否正确
        let {password:hash} = result;
        let compareResult = await compare(password,hash);
        if(compareResult){
            //cookie-session
            req.session.username = username
            // console.log(req.session)
            // ---------------------------------------------
            // const sessionId = randomstring.generate();
            //后端向前端种一个cookie,cookie只要域名不变，向后端做请求时，cookie会一直携带
            // res.set('Set-Cookie',`sessionId=${sessionId};Path=/;HttpOnly`);
            // console.log(sessionId)
            res.render('succ',{
                data: JSON.stringify({
                    username
                })
            })
            

            
        }else{
            res.render('fail',{
                data: JSON.stringify({
                    message:"用户名或密码错误"
                })
            })
        }
    }else{
        res.render('fail',{
            data: JSON.stringify({
                message:"用户名或密码错误"
            })
        })
    }
}
//退出登录
const signout = async(req,res,next) => {
    req.session = null;
    res.render('succ',{
        data:JSON.stringify({
            message:"成功退出登录"
        })
    })
}
//注册用户
const signup = async(req, res, next) => {

    res.set('connect-type','application/json;chartset=utf-8')

    const {username,password} = req.body  //获取前端请求数据

    //密码加密
    const brcyptPassword =await hash(password);
      
    //判断用户是否存在
    let findResult = await usersModel.findOneUser(username);
    if(findResult){
       res.render('fail',{
           data:JSON.stringify({
               message: "用户名已存在"
           })
        })
    }else{
        //数据库中没有该用户，添加用户到数据库
        let result = await usersModel.signup({ //将前端请求数据传入数据库
                username,
                password:brcyptPassword,
            })
            
            res.render('succ',{       //返回前端的数据
                data:JSON.stringify({
                    message: "注册成功"
                })
            })
    } 
  }
//获取用户列表
const list = async (req,res,next) => {
    res.set('connect-type','application/json;chartset=utf-8')
    const listResult = await usersModel.findList();
    res.render('succ',{
        data: JSON.stringify(listResult)
    })

}
//删除用户
const remove = async (req,res,next)=>{
    const{ id }= req.body;
    let result = await usersModel.remove(id);
   if(result){
    res.render('succ',{
        data: JSON.stringify({
         message:'用户删除成功'
     })
    })
   }else{
    res.render('fail',{
        data: JSON.stringify({
         message:'用户删除失败'
     })
    })
   }
  
 
}
const isAuth = async (req,res,next) => {
    if(req.session.username){
        res.render('succ',{
            data:JSON.stringify({
                username:req.session.username,
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:"请先登录"
            })
        })
    }
}


exports.signup = signup;
exports.list = list;
exports.remove = remove;
exports.signin = signin;
exports.signout = signout;
exports.isAuth = isAuth;
