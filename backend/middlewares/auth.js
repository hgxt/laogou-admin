const {verify} = require('../utils/tools')
//鉴权，设置只有登录后才可以访问其他
 const auth = (req,res,next) => {

let token = req.get('X-Access-Token')
    
    try{
        let result = verify(token)
        console.log(result)
        next()
    }catch(err){
        res.render('fail',{
                    data:JSON.stringify({
                        message:"请先登录"
                    })
                })
    }

//     if(req.session.username){
//         next()
//     }else{
//         res.render('fail',{
//             data: JSON.stringify({
//                 message:'请先登录'
//             })
//         })
//     }
// }
}
exports.auth = auth