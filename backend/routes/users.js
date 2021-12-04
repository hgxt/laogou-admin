    var express = require('express');
    var router = express.Router();


    const {signup,list,remove,signin,signout,isAuth} = require('../controllers/users');
    const {auth} = require('../middlewares/auth')

    //注册用户
    router.post('/',auth,signup);
    //用户登录
    router.post('/signin',signin)
    //用户退出登录
    router.get('/signout',auth,signout)
    //获取用户列表
    router.get('/',auth, list);
    //删除用户
    router.delete('/',auth,remove);
    //
    router.get('/isAuth',isAuth);




    module.exports = router;
