import positionsTpl from '../../views/positions.art'
import positionsListTpl from '../../views/positions-list.art'

import page from '../../dataBus/page'
import pagination from '../../components/pagination'

import  {positionList} from '../../models/positions'
import {addPosition} from './add-positions'

import { auth as authModel } from '../../models/auth'

const pageSize = page.pageSize
let dataList = []

const _list = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#positions-list').html(positionsListTpl({
        data:dataList.slice(start,start + pageSize)
    }))
}

const _loadData = async ()=>{
    //获取职位list数据
    const list = await positionList() 
    dataList = list
    //分页
    pagination(dataList,pageSize)
    //list数据渲染
    _list(page.curPage)

}

//分页 subscribe订阅(观察者模式，trigger)
const _subscribe = () =>{
    $('body').off('changeCurPage').on('changeCurPage',(e,index)=>{
        _list(index);
    })
    $('body').off('addPosition').on('addPosition',(e) => {
        _loadData()
    })
  }

const listPositions = (router) => {
    return async (req,res,next)=>{
        //通过·token验证
        let result = await authModel()
       if(result.ret){
        next()
        //
        res.render(positionsTpl())
       
        //初次渲染list
        _loadData()

        //订阅事件
        _subscribe()

        //添加职位·
        addPosition()
       }else{
        router.go('/signin')
    }
    }
}
export default listPositions