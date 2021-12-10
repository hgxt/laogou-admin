const {Positions} = require('../utils/db')

//position添加
exports.add = (data) => {
    const position = new Positions(data)
    return position.save()
}

//position list 
exports.list = () =>{
   return Positions.find({}).sort({_id:-1})
}

//position 删除
exports.remove = (id) => {
    return Positions.deleteOne({_id:id})
}