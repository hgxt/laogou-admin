import http from "../utils/http";
export const userRemove = async(id)=>{
    try{
        let {result} = await http({
            url:'/api/users',
            type:'delete',
            data:{id}
        })
        return result
    }catch(err){
        console.log(err)
    }
    // return $.ajax({
    //     url: "/api/users",
    //     type: 'delete',
    //     dataType: "json",
    //     headers:{
    //         'X-Access-Token': localStorage.getItem('lg-token') || ''
    //     },
    //     data: {
    //         id
    //     },
    //     success(res) {
    //         return res 
    //     }
    // })
}