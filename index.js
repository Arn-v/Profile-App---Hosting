
const express = require("express") ; 
const app = express() ; 



require("dotenv").config() ;
const PORT = process.env.PORT || 8000 ; 



app.use(express.json()) ; 

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors') ; 
app.use(cors({
  origin: 'https://profile-orcin-gamma.vercel.app',
  credentials: true
}));

// const cors = require("cors") ;

// const allowedOrigins = [
//     ''
//   ];

// const corsOptions = {
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
//   };

// app.use( cors(corsOptions) ) ; 


// const allowedOrigin = 'https://profile-orcin-gamma.vercel.app'; // Update with your frontend URL

// const corsOptions = {
//     origin: allowedOrigin,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // Allow credentials (cookies, authorization headers)
// };





const profileRoutes = require("./routes/Profile") ; 
app.use("/api/profile" , profileRoutes ) ; 


const DBconnect = require("./config/database.js") ; 
DBconnect()  ; 


app.listen( PORT , () => {
    console.log(`Server has started succesfully at ${PORT}`) ; 
} )


app.get('/' , (req,res)=>{
    res.send(`<h1> HI , SERVER HERE </h1>`)
})



