import page from "../../dataBus/page";
import usersAddTpl from '../../views/positions-add.art'
//添加用户
export const addUser = () => {
    const html = usersAddTpl()
    $('#users-list-box').after(html)

    const _save = () => {
        //提交表单
        const data = $('#users-form').serialize();
        $.ajax({
            type: "post",
            url: "/api/users",
            headers:{
                'X-Access-Token': localStorage.getItem('lg-token') || ''
            },
            data,
            success: function(response) {
                page.setCurPage(1)

                //告知list页面要重新渲染
            $('body').trigger('addUser')
            }
        });
         //单击关闭模态框
        const $btnClose = $('#users-close')
        $btnClose.click()
    }
    
    //用户添加模态框，点击保存，提交表单
    $("#users-save").on('click',_save)
   
}