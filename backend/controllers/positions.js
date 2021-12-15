const moment = require('moment')
const positionModel = require('../models/positions')

//position添加
exports.add = async (req,res,next) => {
    res.set('content-type','application/json;charset=utf-8')
    console.log(req.companyLogo)
    let result = await positionModel.add({
        ...req.body,
        companyLogo:req.companyLogo,
        createTime: moment().format('YYYY年MM月DD日 HH:mm'),
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

//position listone
exports.listone = async (req,res,next) => {
    let result = await positionModel.listone(req.body.id)
    if(result){
        res.json(result)
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'获取数据失败'
            })
        })
    }
}

//position删除
exports.remove = async (req,res,next)=>{
    let result = await positionModel.remove(req.body.id)
    try{
        if(result.deletedCount>0){
            res.render('succ',{
                data:JSON.stringify({
                    message:'职位删除成功'
                })
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    message:'职位删除失败.ID错误'
                })
            })
        }
    }catch(err){
        res.render('fail',{
            data:JSON.stringify({
                message:'职位删除失败'
            })
        })
    }
}
//position 修改

exports.update = async (req,res,next) =>{
    res.set('content-type','application/json;charset=utf-8')
    const data = {
        ...req.body,
    }
    //如果更新图片，就上传新的图片，如果没有更新，就保留原来的图片
    if(req.companyLogo){
        data['companyLogo']=req.companyLogo
    }
    let result = await positionModel.update(data)
    if(result){
        //修改position成功
        res.render('succ',{
            data:JSON.stringify({
                message:'职位修改成功'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'职位修改失败'
            })
        })
    }
}

//