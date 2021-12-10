const express = require('express')
const router = express.Router()

const { add,list,remove } = require('../controllers/positions')
const uploadMiddleware = require('../middlewares/upload')

router.post('/add',uploadMiddleware,add)
router.get('/list',list)
router.delete('/remove',remove)

module.exports = router