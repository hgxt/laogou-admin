import indexTpl from '../views/index.art';
import { auth as authModel } from '../models/auth';

import img from '../assets/user2-160x160.jpg'

const index = (router) => {
        
        return async(req, res, next) => {
            let result = await authModel()
            if(result.ret){
                //渲染首页
                // res.render(indexTpl({}));
                const html = indexTpl({
                    //webpack渲染模板？
                    subRouter:res.subRoute(),//会生成一个div
                    img
                })
                next(html)
                

                //window resize ,让页面撑满整个屏幕
                $(window, '.wrapper').resize();
                const $as = $('#sidebar-menu li:not(:first-child) a')
                let hash = location.hash
                $as.filter(`[href="${hash}"]`).parent().addClass('active').siblings().removeClass('active')
            }else{
                router.go('/signin')
            }

        }      
};

export default index