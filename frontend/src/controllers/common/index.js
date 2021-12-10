
import * as removeModel  from '../../models/remove' 
import page from '../../dataBus/page';

const pageSize =page.pageSize;

//删除事件绑定
const remove = ({
    $box,
    url,
    loadData,
    state

}) => {
    $box.on('click', '.remove',async function() { //不要写·箭头函数，this会不对
        length = state.list.length
        let result =await removeModel.remove({
            url,
            id:$(this).data('id')
        })
        

        if(result.ret){
            
         loadData();
    
         const lastPage = Math.ceil(length / pageSize) == page.curPage;
         const leastOne = length % pageSize ==1;
         const notPageFirst = page.curPage > 0
    
         if(lastPage && leastOne && notPageFirst){
             page.setCurPage(page.curPage - 1)
         }
        }
        
     })
}

export {remove}