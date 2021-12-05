//公共数据
class Page{
   constructor(){
       this.curPage = 1;
       this.pageSize = 10;
   }

   setCurPage(curPage){
       this.curPage = curPage
   }
}

export default new Page()