import http from '../utils/http'

export const positionList = async () => {
    try{
        let {result} = await http({
            url:'/api/positions/list'
        })
        return result
          
    }catch(err){
        console.log(err)
    }
}
//添加
export const positionAdd = () =>{

        return new Promise((resolve,reject)=>{
        //引入jquery.form插件后，有方法ajaxSubmit(),
        //ajax的form表单无法上传二进制流的图片信息
        var options = {
            url:'/api/positions/add',
            type:'post',
            dataType:'json',
            resetForm:true,
            timeout:30000,     //限制请求时间
            success:(result)=>{
                resolve(result)
            },
            error:(err)=>{
                reject(err)
            }
        }
        $('#position-form').ajaxSubmit(options)
        })

    // try{
        // let {result} = await http({
        //     type:'post',
        //     url:'/api/positions/add',
        //     data
        // })
        // return result

        
    // }catch(err){
    //     console.log(err)
    // }
}