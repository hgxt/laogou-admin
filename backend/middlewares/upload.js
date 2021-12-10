const path = require('path')
const multer = require('multer')
const mime = require('mime')

let filename = ''
const storage = multer.diskStorage({
    //上传文件的保存地址
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/uploads'))
    },
    //文件命名
    filename:function(req,file,cb){
        let ext = mime.getExtension(file.mimetype)
        filename = file.fieldname + '-' + Date.now() + '.' + ext
        cb(null,filename)
    }
})
const limits = {
    fileSize: 200000,
    files: 1 
}
//限制可上传文件类型
const acceptType = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif'
]

function fileFilter (req,file,cb){
    //这个函数应该调用cb的Boolean值来指示是否应该接受文件
    const mimetype = file.mimetype
    if(!acceptType.includes(mimetype)){
        cb(new Error('文件类型必须是.png，.jpg，.jpeg，.gif '))
    }else{
        cb(null,true)
    }
}

var upload = multer({
    storage,
    limits,
    fileFilter
}).single('companyLogo')
//路由中间件方式,错误处理方式
const uploadMiddleware = (req,res,next) => {
    
    upload(req,res,function(err){
        if(err instanceof multer.MulterError){
            //发生错误
            res.render('fail',{
                data:JSON.stringify({
                    massage:'文件超出200k'
                })
            })
        }else if(err){
            //发生错误
            res.render('fail',{
                data:JSON.stringify({
                    massage:err.message
                })
            })
        }
        //一切都好
        req.companyLogo = filename
        next()
    })

}
module.exports = uploadMiddleware