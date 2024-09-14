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

const upload = multer({ storage }) ;

// const storage = multer.memoryStorage();  // Store file in memory

// const upload = multer({ storage });

// const upload = multer({ 
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
//     fileFilter: (req, file, cb) => {
//         const filetypes = "/jpeg|jpg|png/";  // Only allow JPEG and PNG files
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);
        
//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only images of type JPG, JPEG, and PNG are allowed!'));
//         }
//     }
// });





router.get("/" , getUserProfile )  ; 
router.post("/save" , upload.single('profilePicture') ,  saveProfile) ; 
// validateUserProfile 



module.exports = router ;  
