const express=require('express')
const {getbootcamps,getsingle,createcamp,deletecamp}=require('../controllers/bootcampcontrol')
const{errorhandle}=require('../middlewares/errors')
const router=express.Router()
router.get('/',getbootcamps)
router.get('/:id',getsingle,errorhandle)
router.post('/create-camp',createcamp,errorhandle)
router.delete('/delete-camp/:id',deletecamp,errorhandle)



 module.exports = router