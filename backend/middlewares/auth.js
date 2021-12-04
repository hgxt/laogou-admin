//鉴权，设置只有登录后才可以访问其他
const auth = (req,res,next) => {
    if(req.session.username){
        next()
    }else{
        res.render('fail',{
            data: JSON.stringify({
                message:'请先登录'
            })
        })
    }
}

exports.auth = auth