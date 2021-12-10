//处理逻辑s
import usersTpl from '../../views/users.art';
import usersListTpl from '../../views/users-list.art';

import pagination from '../../components/pagination';
import page from '../../dataBus/page';

import {addUser} from './add-user'
import { usersList as usersListModel} from '../../models/user-list';
import { auth as authModel } from '../../models/auth';

import {remove} from '../common/index'



let curPage = 1;
const pageSize =page.pageSize;
let state = {
    list:[]
}

//用户注册



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
    // console.log(dataList.slice(strat, strat + pageSize))
    $('#users-list').html(usersListTpl({
        
         data: state.list.slice(strat, strat + pageSize)
    }))

}

//从后端加载到的数据
const _loadData = async () => {
   let result = await usersListModel()

   state.list = result.data
   //分页
   pagination(result.data,pageSize)
   //数据渲染
   _list(page.curPage)
}

const index = (router) => {
    const loadIndex = (res,next)=> {
        //填充用户列表
        // $('#content').html(usersTpl());
        next()
        res.render(usersTpl())
        //添加按钮的点击事件
        $('#add-user-btn').on('click',addUser)
         
        //初次渲染用户list
        _loadData();
   
    }

        //页面事件绑定
        remove({
            $box: $('#users-list'),
            url:'/api/users',
            loadData:_loadData,
            state  //传递一个引用类型的值，在删除组件里能实时获取数据条数
        })


        //订阅事件
        _subscribe()
           
        return async(req, res, next) => {
            let result = await authModel()
            if(result.ret){
                loadIndex(res,next)
            }else{
                // console.log(result)
                router.go('/signin')
            }

        }      
};

 export default index