const http = ({
    type='get',
    url,
    data={}
}) => {
    return new Promise((resolve,reject) => {
         $.ajax({
             type,
             url,
             data,
             dataType: "json",
             headers:{
                'X-Access-Token':localStorage.getItem('lg-token')  || ''
            },
             success: function (result,textStatus,jqXHR) {
                 resolve({
                    result,
                    textStatus,
                    jqXHR
                 })
             },
             error: function(err){
                 reject(err.message)
             }
         });  

    })
}

export default http