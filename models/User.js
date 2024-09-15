
const mongoose = require("mongoose")  ; 

const userSchema = new mongoose.Schema(
    {
       firstName:{ type:String , required:true , maxlength:50 } , 

       lastName : { type:String , required:true , maxlength:60 } , 

       email: { type:String , required:true } , 

       address : { type:String , required:true } , 

       profilePicture : {  type:String  , default:"https://res.cloudinary.com/da7bxgnwd/image/upload/v1726326513/default-avatar-icon_awgzwb.jpgs"  } 


    }
)


module.exports = mongoose.model("User" , userSchema) ; 


