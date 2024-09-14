
const User = require("../models/User") ; 
require("dotenv").config() ;




const cloudinary = require("cloudinary").v2 ; 

cloudinary.config({ 
  cloud_name: 'da7bxgnwd', 
  api_key: '529635673796622', 
  api_secret: '301Tl8LqzkYvzIfdcmAKF5zZCPU' 
});



// JSON Web Token -> email_id , id 



//Handler for getting the user's profile information(latest)
exports.getUserProfile = async(req,res) => 
{
   try
    {

     const userProfileData = await User.findOne(   ) ; 

     if(!userProfileData){
        return res.status(404).json({ success:false , 
                                    message:"Profile Data Not Found "
                                    } ) 
     }


     //successful response case
      res.status(200).json({ success:true, 
                                 data:userProfileData , 
                                 message:"Profile Data Succesffully Found "
                                } ) 

    }


    catch(error){
      console.log(error)
      console.error(error) 

      res.status(500).json(
        { success:false , 
          message:"Internal Server Error " ,
          data: error 
        }
       )
    }


}







//Handler for updating existing user's profile information or saving the current profile
exports.saveProfile = async(req,res) => 
{
  try
  {

    console.log('Received data:', req.body);  // Log received data
    console.log('Received files:', req.files);  // Log received files

    const profileData = JSON.parse(req.body.profileData);
    const { firstName, lastName, email, address } = profileData;

    // Validate required fields
    if (!firstName || !lastName || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required fields"
      });
    }

    let profilePictureUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profileApp",
      });
      profilePictureUrl = result.secure_url;
    }


      const newProfileData = {
          firstName,
          lastName,
          email,
          address,
          profilePicture: profilePictureUrl || "" // Use the new image if uploaded
      };

    
    // VALIDATION LEFT 

    const userProfile = await User.findOne( )

   if( userProfile )
     { 
      const updatedProfile = await User.findOneAndUpdate( {} , newProfileData , { new:true }) ; 

      //successful response case
      res.status(200).json({ success:true, 
        data: updatedProfile , 
        message:"Profile Data Updated successfully"
       } ) 
     }



  // NEW USER
   else
   { 

      //create new entry for User
       let user = await User.create( {
                                        firstName,lastName,email,address,profilePicture
                                        })

        console.log(user) ; 

        user = user.toObject(); 

        //now creating a JWT for AuthN 
        // const payload = {
        //     name:user.firstName, 
        //     email:user.email,
        //     id:user._id
        //       };


      // console.log("token created") ; 

      


      // const jwt = require("jsonwebtoken") ; 

      // let token =  jwt.sign(payload, 
      //     process.env.JWT_SECRET,
      //     {
      //         expiresIn:"5h",
      //     });

          
      // user = user.toObject();
      // user.token = token;

      // const options = {
      //     expires: new Date( Date.now() + 3*24*60*60*1000),
      //     httpOnly:true,
      //     secure: true, // Ensure the cookie is only used with HTTPS
      //     sameSite: 'None' // Ensure the cookie is sent in cross-site requests

      // }

    // creating a cookie & sending  in the response 
    // return res.cookie("token", token, options).status(200).json({
    //   success: true,
    //   token,
    //   user,
    //   message: 'User profile created successfully',
    //   });
     return res.status(200).json (
      { success : true , 
        message: 'User profile created successfully' ,
        data : user 
      }
     )

  }


}


   catch(error){
       console.log(error) ; 
       console.error(error) ; 

       res.status(500).json(
         { success:false , 
          message:"Internal Server Error "  ,
          data: error.message 
         })
    }


}


//Handler for clearing the information 
exports.clearProfileData = async ( req , res ) => {

  try
    {

     const userProfileData = await User.findOne(  ) ; 

     if(!userProfileData){
        return res.status(404).json({ success:false , 
                                    message:"Profile Data Not Found "
                                    } ) 
     }


      const clearedUserProfile = await User.findOneAndUpdate( {} ,  { firstName: '', lastName: '' , email:'' , address:'' }, 
                                                                  { new: true } ) ;  


     //successful response case
      res.status(200).json({ success:true, 
                                 data:clearedUserProfile , 
                                 message:"Profile Data Succesffully Cleared "
                                } ) 

    }


    catch(error){
      console.log(error)
      console.error(error) 

      res.status(500).json(
        { success:false , 
          message:"Internal Server Error " ,
          data: error 
        }
       )
    }

}








//Hnadler for signining up for new  profile
// exports.signup = async (req,res) => 
// {

//     try
//     {
//         const {firstName,lasttName, email, address} = req.body;

//         const existingUser = await User.findOne({email});

//         if(existingUser){
//             return res.status(400).json({
//                 success:false,
//                 message:'Profile already Exists',
//             });
//         }

//         //create new entry for User
//         const user = await User.create({
//             firstName,lastName,email,address
//         })

//       //now creating a JWT for AuthN 
//         const payload = {
//             name:firstName, 
//             email:user.email,
//             id:user._id
//         };


//         let token =  jwt.sign(payload, 
//             process.env.JWT_SECRET,
//             {
//                 expiresIn:"2h",
//             });

            
//         user = user.toObject();
//         user.token = token;

//        // creating a cookie & sending  in the response 
//         res.cookie("token", token, options).status(200).json({
//             success:true,
//             token,
//             user,
//             message:'User Logged in successfully',
//         });


//         return res.status(200).json({
//             success:true,
//             message:'New User Created Successfully',
//         });

//     }


//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:'User cannot be registered, please try again later',
//         });
//     }
// }
