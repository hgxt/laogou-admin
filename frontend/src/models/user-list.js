export const usersList = ()=>{
     //jq的ajax返回值是promise
    return $.ajax({
        url: "/api/users",
        // async:false,
        dataType: 'json',
        headers:{
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        success(result) {
            return result
        },
    })
}