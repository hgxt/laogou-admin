import { auth as authModel } from '../../models/auth'
const listPositions = (router) => {
    return async (req,res,next)=>{
        let result = await authModel()
       if(result.ret){
        next()
        res.render('positions')
       }else{
        router.go('/signin')
    }
    }
}
export default listPositions