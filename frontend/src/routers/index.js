import SMERouter from 'gp21-router';
const router = new SMERouter('root');

import {auth as authModel} from '../models/auth'

import index  from '../controllers/index'
import listUser from '../controllers/users/list-user.js'
import listPosition from '../controllers/positions/list-position'
import signin from '../controllers/signin'


//做守卫，没有定义路由名字，进入任何路由
//打开第一个页面
router.use(async(req) => {
    const url = req.url
    let result = await authModel()

    if(result.ret){
        router.go(url)
    }else{
        console.log(result)
        router.go('/signin')
    }
})
//这个非常重要，就是不太懂
router.route('/',()=>{})

router.route('/',signin(router))

router.route('/index',index(router))

router.route('/index/users',listUser(router))
router.route('/index/positions',listPosition(router))

export default router;


