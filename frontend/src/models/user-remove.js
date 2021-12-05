export const userRemove = (id)=>{
    return $.ajax({
        url: "/api/users",
        type: 'delete',
        dataType: "json",
        headers:{
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        data: {
            id
        },
        success(res) {
            return res 
        }
    })
}