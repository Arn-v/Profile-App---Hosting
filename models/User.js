
const mongoose = require("mongoose")  ; 

const userSchema = new mongoose.Schema(
    {
       firstName:{ type:String , required:true , maxlength:50 } , 

       lastName : { type:String , required:true , maxlength:60 } , 

       email: { type:String , required:true } , 

       address : { type:String , required:true } 
    }
)


module.exports = mongoose.model("User" , userSchema) ; 


