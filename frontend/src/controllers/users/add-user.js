import page from "../../dataBus/page";
import usersAddTpl from '../../views/positions-add.art'

import { userAdd as userAddModel } from "../../models/user-add";
//添加用户
export const addUser = () => {
    const html = usersAddTpl()
    $('#users-list-box').after(html)

    const _save = async() => {
        //提交表单
        const data = $('#users-form').serialize();
        let result = await userAddModel(data)
        console.log(result.ret)
        if(result.ret){
            page.setCurPage(1)
            //告知list页面要重新渲染
            $('body').trigger('addUser')
        }
         //单击关闭模态框
        const $btnClose = $('#users-close')
        $btnClose.click()
    }
    
    //用户添加模态框，点击保存，提交表单
    $("#users-save").on('click',_save)
   
}