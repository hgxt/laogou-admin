import SMERouter from 'sme-router';
const router = new SMERouter('root');

import { signin,index } from '../controllers';

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
router.route('/',()=>{})

router.route('/',signin(router))

router.route('/index',index(router))

// router.route('/signin',signin(router))

export default router;


