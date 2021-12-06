import http from "../utils/http";

export const usersList = async()=>{
    try{
        let {result} = await http({
            url: "/api/users",
        })
        return result
    }catch(err){
        console.log(err)
    }
     //jq的ajax返回值是promise
    // return $.ajax({
    //     url: "/api/users",
    //     // async:false,
    //     dataType: 'json',
    //     headers:{
    //         'X-Access-Token': localStorage.getItem('lg-token') || ''
    //     },
    //     success(result) {
    //         return result
    //     },
    // })
}