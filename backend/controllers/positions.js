const moment = require('moment')
const positionModel = require('../models/positions')

//position添加
exports.add = async (req,res,next) => {
    res.set('content-type','application/json;charset=utf-8')
    let result = await positionModel.add({
        ...req.body,
        createTime: moment().format('YYYY年MM月DD日 HH:mm')
    })
    if(result){
        //添加position成功
        res.render('succ',{
            data:JSON.stringify({
                message:'职位添加成功'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'职位添加失败'
            })
        })
    }
}
//position list 
exports.list = async (req,res,nex) => {
    let result = await positionModel.list()
    if(result){
        res.json(result)
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'获取list失败'
            })
        })
    }
}