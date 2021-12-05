//处理逻辑
import indexTpl from '../views/index.art';

import usersTpl from '../views/users.art';

import usersListTpl from '../views/users-list.art';

import pagination from '../components/pagination';

import page from '../dataBus/page';


const htmlIndex = indexTpl({});

let curPage = 1;
const pageSize = 3;
let dataList = [];

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
            page.setCurPage(1)

            //渲染用户list
            _loadData()
        }
    });
    $btnClose.click()
}
//事件绑定方法
const _methods =() =>{
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

                const lastPage = Math.ceil(dataList.length / pageSize) == page.curPage;
                const leastOne = dataList.length % pageSize ==1;
                const notPageFirst = page.curPage > 0

                if(lastPage && leastOne && notPageFirst){
                    page.setCurPage(page.curPage - 1)
                }
            }
        })
    })

    //用户添加模态框，点击保存，提交表单
    $("#users-save").on('click', _signup)
}

//分页 subscribe订阅(观察者模式，trigger)
const _subscribe = () =>{
  $('body').on('changeCurPage',(e,index)=>{
      _list(index);
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

//从后端加载到的数据
const _loadData = () => {
    //jq的ajax返回值是promise
    $.ajax({
        url: "/api/users",
        // async:false,
        dataType: 'json',
        success(result) {
            dataList = result.data;
            //用户分页
            pagination(result.data,pageSize);
            //数据渲染
            _list(page.curPage)
        },
    })
}

const index = (router) => {
    const loadIndex = (res)=> {
        //渲染首页
        res.render(htmlIndex);

        //window resize ,让页面撑满整个屏幕
        $(window, '.wrapper').resize();

        //填充用户列表
        $('#content').html(usersTpl());

        //页面事件绑定
        _methods()

        //初次渲染用户list
        _loadData();
        }

        //订阅事件
        _subscribe()
           
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

export default index