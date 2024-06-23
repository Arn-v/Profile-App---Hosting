const { getUserProfile, saveProfile } = require('../controllers/ProfileController')
const { auth } = require('../middlewares/auth');
const { validateUserProfile } = require('../middlewares/validators');


const express = require("express") ; 


const router = express.Router() ;

router.get("/" , getUserProfile )  ; 
router.post("/save" , validateUserProfile ,saveProfile) ; 


module.exports = router ;  
