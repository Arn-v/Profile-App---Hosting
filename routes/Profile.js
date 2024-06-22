const { getUserProfile, saveProfile } = require('../controllers/ProfileController')
const { auth } = require('../middlewares/auth');

const express = require("express") ; 

const router = express.Router() ;


router.get("/" , auth , getUserProfile )  ; 
router.post("/save" , saveProfile) ; 


module.exports = router ;  
