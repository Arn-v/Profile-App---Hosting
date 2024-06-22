
const express = require("express") ; 
const app = express() ; 




require("dotenv").config() ;
const PORT = process.env.PORT || 8000 ; 



app.use(express.json()) ; 

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors") ; 

app.use( cors( {
                origin: 'https://profile-orcin-gamma.vercel.app/',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true,
  }) ) ; 





const profileRoutes = require("./routes/Profile") ; 
app.use("/api/profile" , profileRoutes) ; 


const DBconnect = require("./config/database.js") ; 
DBconnect()  ; 


app.listen( PORT , () => {
    console.log(`Server has started succesfully at ${PORT}`) ; 
} )


app.get('/' , (req,res)=>{
    res.send(`<h1> HI , SERVER HERE </h1>`)
})



