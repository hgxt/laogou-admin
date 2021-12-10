import indexTpl from '../views/index.art';
import { auth as authModel } from '../models/auth';

import img from '../assets/user2-160x160.jpg'
import pageHeader from '../components/pageheader'

import page from '../dataBus/page'

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

                //加载页面导航
                pageHeader()

                const $as = $('#sidebar-menu li:not(:first-child) a')
                let hash = location.hash
                $as
                .filter(`[href="${hash}"]`)
                .parent()
                .addClass('active')
                .siblings().removeClass('active')

                //是否重置page

                //当前url保存
                page.setCurRoute(hash)

                //登出事件绑定
                $("#users-signout").off('click').on('click',function(e){
                    e.preventDefault()//关掉a链接的默认行为
                    localStorage.setItem('lg-token','')
                    location.reload()
                    // $.ajax({
                    //     url:'/api/users/signout',
                    //     dataType:"json",
                    //     headers:{
                    //         'X-Access-Token': localStorage.getItem('lg-token') || ''
                    //     },
                    //     success(res){
                    //         if(res.ret){
                    //             location.reload();//刷新页面
                    //         }
                    //     }
                    // })
                    })

            }else{
                router.go('/signin')
            }

        }      
};

export default index