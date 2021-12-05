export const  userAdd = (data) =>{
    return $.ajax({
        type: "post",
        url: "/api/users",
        dataType: "json",
        headers:{
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        data,
        success: function(res) {
           return res
        }
    });
}