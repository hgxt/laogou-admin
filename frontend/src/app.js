//载入css
import './assets/common.css'

//载入路由
import router from './routers'

//打开第一个页面
const hash = location.hash.slice(1)
console.log(hash)

router.go(hash)
