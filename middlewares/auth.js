
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) =>
 {
    try{
        //extract JWT token from req to validate user 
       
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        console.log("token extracted" , token) ; 
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verifying the token -  is it valid or not 
        try
         {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          console.log(payload);
          req.user = payload;
         } 
        

        catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        console.log("JWT payload" , payload)  ;
        console.log("user authenticated") ; 

      //nest middleware or handler
        next();
    } 

    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
   
}
