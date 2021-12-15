import positionsUpdateTpl from '../../views/positions-update.art'
import positionsUpadteFormTpl from '../../views/positions-update-form.art'
import http from '../../utils/http'
import page from '../../dataBus/page'
import {positionsUpdate} from '../../models/positions'
//修改position
export const updatePosition =  () => {
  //编辑按钮模态框框架
    $('#positions-list-box').after(positionsUpdateTpl())

    const _save = async () => {
        try{
            //
            let result = await positionsUpdate()
            if(result.ret){
               //添加数据后渲染
            page.setCurPage(1)
            //告知list要重新渲染
            $('body').trigger('addPosition')
            //单击关闭模态框
            $('#positions-close-update').click()
            }
        }catch(err){
            console.log(err)
        }
    }
    //点击保存，提交表单
    $('#positions-save-update').off('click').on('click',_save)
}
//再次填充职位编辑模态框
export const fillPositionsUpdateTpl = async (id) => {
    
    let {result} = await http({
        url:'api/positions/listone',
        type:'post',
        data:{
            id:id
        }
    })
    $('#position-form-update').html(positionsUpadteFormTpl({
        data:{
            ...result
        }
    }))


}