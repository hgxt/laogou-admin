import singinTpl from '../views/signin.art';

const htmlSignin = singinTpl({});

const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault();
       
        const data = $("#signin").serialize();
        $.ajax({
            url:'/api/users/signin',
            type:'post',
            dataType:"json",
            data,
            success:function(res){
                  if(res.ret){
                    router.go('/index');
                  }
            }
        })
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