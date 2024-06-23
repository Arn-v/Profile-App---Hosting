const { getUserProfile, saveProfile } = require('../controllers/ProfileController')
const { auth } = require('../middlewares/auth');


const express = require("express") ; 
const { validateUserProfile } = require('../middlewares/validators');

const router = express.Router() ;


router.get("/" , getUserProfile )  ; 
router.post("/save" , validateUserProfile ,saveProfile) ; 


module.exports = router ;  
