
export const auth = () =>{
   return $.ajax({
        url: "/api/users/isAuth",
        dataType: "json",
        headers:{
            'X-Access-Token':localStorage.getItem('lg-token')  || ''
        },
        success: function (result) {
            return result
        },
        
    });
}
