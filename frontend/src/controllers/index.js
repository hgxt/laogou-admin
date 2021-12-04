//处理逻辑

import indexTpl from '../views/index.art';
import singinTpl from '../views/signin.art';

import usersTpl from '../views/users.art';

import usersListTpl from '../views/users-list.art';
import usersListPageTpl from '../views/users-pages.art';

// import router from '../routers'

const htmlIndex = indexTpl({});
const htmlSignin = singinTpl({});

let curPage = 1;
const pageSize = 3;
let dataList = [];


const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault();
       
        const data = $("#signin").serialize();
        $.ajax({
            url:'/api/users/signin',
            type:'post',
            dataType:"json",
            data,
            success:function(res){
                  if(res.ret){
                    router.go('/index');
                  }
            }
        })
    }
};
//用户注册
const _signup = () => {
    const $btnClose = $("#users-close");
    //提交表单
    const data = $('#users-form').serialize();
    $.ajax({
        type: "post",
        url: "/api/users",
        data,
        success: function(response) {
            console.log(response);
            //渲染用户list
            _loadData()
        }
    });
    $btnClose.click()
}

//分页
const _pagination = (data) => {

    const total = data.length;
    const pageCount = Math.ceil(total / pageSize);

    // const pageArry = new Array(pageCount);
    const pageArry = [];
    for (let i = 1; i <= pageCount; i++) {
        pageArry.push(i)
    }
    const htmlPage = usersListPageTpl({
        pageArry
    })
    console.log(htmlPage)
    $('#users-page').html(htmlPage);
    _setPageActive(curPage)

    // $("#users-page-list li:nth-child(2)").addClass('active')


}
const _loadData = () => {
    //jq的ajax返回值是promise
    $.ajax({
        url: "/api/users",
        // async:false,
        dataType: 'json',
        success(result) {
            dataList = result.data;
            //用户分页
            _pagination(result.data);
            _list(curPage)
        },
    })
}
//获取用户列表
const _list = (pageNo) => {
    //渲染用户list
    let strat = (pageNo - 1) * pageSize
    console.log(dataList.slice(strat, strat + pageSize))
    $('#users-list').html(usersListTpl({
        
         data: dataList.slice(strat, strat + pageSize)
    }))

}
//用户登录
const signin = (router) => {
    return (req, res, next) => {
        res.render(htmlSignin);

        $("#signin").on('submit', _handleSubmit(router))
    }
};
const _setPageActive = function(index) {
    //点击时高亮
    $("#users-page #users-page-list li:not(:first-child,:last-child")
        .eq(index - 1)
        .addClass('active').siblings().removeClass('active');
}
const index = (router) => {
    const loadIndex = (res)=> {
        //渲染首页
        res.render(htmlIndex);

        // //window resize ,让页面撑满整个屏幕
        $(window, '.wrapper').resize();

        //填充用户列表
        $('#content').html(usersTpl());
        //删除事件绑定
        $("#users-list").on('click', '.remove', function() { //不要写·箭头函数，this会不对
            //    console.log($(this).data('id'))
            $.ajax({
                url: "/api/users",
                type: 'delete',
                data: {
                    id: $(this).data('id')
                },
                success() {
                    _loadData();

                    const lastPage = Math.ceil(dataList.length / pageSize) == curPage;
                    const leastOne = dataList.length % pageSize ==1;
                    const notPageFirst = curPage > 0

                    if(lastPage && leastOne && notPageFirst){
                        curPage--;
                    }
                }
            })
        })
        //分页事件绑定
        $("#users-page").on('click', "#users-page-list li:not(:first-child,:last-child)", function() {

            //渲染第二页
            const index = $(this).index();
            console.log(index)
            curPage = index;
            _list(curPage)
            _setPageActive(index)
        })
        $("#users-page").on('click',"#users-page-list li:first-child", function(){
            if(curPage > 1){
                curPage--;
                _list(curPage)
                _setPageActive(curPage)
            }
        })
        $("#users-page").on('click',"#users-page-list li:last-child", function(){
            if(curPage < Math.ceil(dataList.length / pageSize)){
            curPage++;
            _list(curPage)
            _setPageActive(curPage)
            }
        })

        //登出事件绑定
        $("#users-signout").on('click',function(e){
        e.preventDefault()//关掉a链接的默认行为
        $.ajax({
            url:'/api/users/signout',
            dataType:"json",
            success(res){
                if(res.ret){
                    location.reload();//刷新页面
                }
            }
        })
        })

        //初次渲染用户list
        _loadData();

        //用户添加模态框，点击保存，提交表单
        $("#users-save").on('click', _signup)



        }
           
    return (req, res, next) => {
        //防止用户自己输入网址登录
        $.ajax({
            url: "/api/users/isAuth",
            dataType: "json",
            success(result) {
                if(result.ret){
                    loadIndex(res)
                }else{
                    // console.log(result)
                    router.go('/signin')
                }
            },
        });
    }      
};
// const index = (req,res,next)=>{
//     res.render(htmlSignin);

// }

// const singin =(req,res,next)=>{
//     res.render(htmlSignin)
// }

export {
    index,
    signin,

}