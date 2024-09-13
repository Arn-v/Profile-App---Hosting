const { getUserProfile, saveProfile } = require('../controllers/ProfileController')
const { auth } = require('../middlewares/auth');
const { validateUserProfile } = require('../middlewares/validators');


const express = require("express") ; 
const router = express.Router() ;


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique file names
    }
});

const upload = multer({ storage });




router.get("/" , getUserProfile )  ; 
router.post("/save" , validateUserProfile , saveProfile) ; 


module.exports = router ;  
