const { getUserProfile, saveProfile } = require('../controllers/ProfileController')
// const { auth } = require('../middlewares/auth');
const { validateUserProfile } = require('../middlewares/validators');


const express = require("express") ; 


const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));  // Create unique file names
        }
    });
const upload = multer({ storage });



const router = express.Router() ;

router.get("/" , getUserProfile )  ; 
router.post("/save" , upload.single('profilePicture') , validateUserProfile , saveProfile) ; 


module.exports = router ;  
