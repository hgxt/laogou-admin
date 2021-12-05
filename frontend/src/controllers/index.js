//处理逻辑
import indexTpl from '../views/index.art';
import usersTpl from '../views/users.art';
import usersListTpl from '../views/users-list.art';

import pagination from '../components/pagination';
import page from '../dataBus/page';

import {addUser} from './users/add-user'



const htmlIndex = indexTpl({});

let curPage = 1;
const pageSize = 3;
let dataList = [];

//用户注册

//事件绑定方法
const _methods =() =>{
    //登出事件绑定
    $("#users-signout").on('click',function(e){
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

    //删除事件绑定
    $("#users-list").on('click', '.remove', function() { //不要写·箭头函数，this会不对
        //    console.log($(this).data('id'))
        $.ajax({
            url: "/api/users",
            type: 'delete',
            headers:{
                'X-Access-Token': localStorage.getItem('lg-token') || ''
            },
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
}

//分页 subscribe订阅(观察者模式，trigger)
const _subscribe = () =>{
  $('body').on('changeCurPage',(e,index)=>{
      _list(index);
  })
  $('body').on('addUser',(e) => {
      _loadData()
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
        headers:{
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
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
        $('#add-user-btn').on('click',addUser)

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
                headers:{
                    'X-Access-Token': localStorage.getItem('lg-token') || ''
                },
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

export default index