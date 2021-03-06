import singinTpl from '../views/signin.art';
import {signin as signinModel} from '../models/signin'

const htmlSignin = singinTpl({});

const _handleSubmit = (router) => {
    return async(e) => {
        e.preventDefault();
        const data = $("#signin").serialize();
        let {res,jqXHR} = await signinModel(data)
        //获取后端传到首部字段head上的token
        const token =jqXHR.getResponseHeader('X-Access-Token')
        //把token存在本地，方便下次请求使用
        localStorage.setItem('lg-token',token)
          if(res.ret){
            router.go('/index');
          }
        
    }
};
//用户登录
const signin = (router) => {
    return (req, res, next) => {
        res.render(htmlSignin);

        $("#signin").on('submit', _handleSubmit(router))
    }
};

export default signin