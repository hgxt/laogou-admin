
import usersListPageTpl from '../views/users-pages.art';
import page from '../dataBus/page';
//分页
const _setPageActive = function(index) {
    //点击时高亮
    $("#users-page #users-page-list li:not(:first-child,:last-child")
        .eq(index - 1)
        .addClass('active').siblings().removeClass('active');
}
//分页
const pagination = (data,pageSize) => {

    const total = data.length;
    const pageCount = Math.ceil(total / pageSize);

    // const pageArry = new Array(pageCount);
    const pageArry = [];
    for (let i = 1; i <= pageCount; i++) {
        pageArry.push(i)
    }
    const htmlPage = usersListPageTpl({
        pageArry
    })
    $('#users-page').html(htmlPage);
    //点击时高亮
    _setPageActive(page.curPage)

    _bindEvent(data,pageSize);
}

const _bindEvent = (data,pageSize) =>{
    //分页事件绑定
    //用户添加时出现两个，添加off?
    $("#users-page").off('click').on('click', "#users-page-list li:not(:first-child,:last-child)", function() {
        //渲染第二页
        const index = $(this).index();

        page.setCurPage(index)

        $('body').trigger('changeCurPage',index);

        _setPageActive(index)
    })
    $("#users-page").on('click',"#users-page-list li:first-child", function(){
        if(page.curPage > 1){
            page.setCurPage(page.curPage - 1)
            $('body').trigger('changeCurPage',page.curPage);
            _setPageActive(page.curPage)
        }
    })
    $("#users-page").on('click',"#users-page-list li:last-child", function(){
        if(page.curPage < Math.ceil(data.length / pageSize)){
            page.setCurPage(page.curPage + 1)
            $('body').trigger('changeCurPage',page.curPage);
        _setPageActive(page.curPage)
        }
    })
}
 

export default pagination