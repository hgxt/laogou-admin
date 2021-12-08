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
export const positionAdd = async(data) =>{
    try{
        let {result} = await http({
            type:'post',
            url:'/api/positions/add',
            data
        })
        return result
    }catch(err){
        console.log(err)
    }
}