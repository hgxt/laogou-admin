import http from "../utils/http";

export const  userAdd = async (data) =>{
    try{
        let {result} = await http({
            type:'post',
            url: "/api/users",
            data:data
        })
        return result
    }catch(err){
        console.log(err)
    }
   
    // return $.ajax({
    //     type: "post",
    //     url: "/api/users",
    //     dataType: "json",
    //     headers:{
    //         'X-Access-Token': localStorage.getItem('lg-token') || ''
    //     },
    //     data,
    //     success: function(res) {
    //        return res
    //     }
    // });
}