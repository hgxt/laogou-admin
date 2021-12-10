import  {positionAdd} from '../../models/positions'
import positionAddTpl from '../../views/positions-add.art' 
import page from '../../dataBus/page'
 

//添加position
export const addPosition = () => {
    //职位添加的模态框
    $('#positions-list-box').after(positionAddTpl())

    //提交表单
    const _save = async() => {
        try{
            // const data = $('#position-form').serialize()
        let result = await positionAdd()
        if(result.ret){
            //添加数据后渲染
            page.setCurPage(1)
            //告知list要重新渲染
            $('body').trigger('addPosition')
            //单击关闭模态框
            $('#positions-close').click()
        }
        }catch(err){
            console.log(err)
        }
    }
        //点击保存，提交表单
        $('#positions-save').on('click',_save)
}
