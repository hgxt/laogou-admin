import SMERouter from 'sme-router';
const router = new SMERouter('root');

import index  from '../controllers/index';
import signin from '../controllers/signin'

//做守卫，没有定义路由名字，进入任何路由
//打开第一个页面
router.use((req) => {
    $.ajax({
        url: "/api/users/isAuth",
        dataType: "json",
        success: function (result) {
            if(result.ret){
                router.go('/index')
            }else{
                console.log(result)
                router.go('/signin')
            }
        },
        
    });
})
//这个非常重要，就是不太懂
router.route('/',()=>{})

router.route('/',signin(router))

router.route('/index',index(router))

// router.route('/signin',signin(router))

export default router;


