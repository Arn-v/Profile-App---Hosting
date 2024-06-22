
const mongoose = require("mongoose");

require("dotenv").config();

function DBconnect()
{

    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    })
    .then(() => {console.log("DB connected successfully")})
    .catch( (errOR) => {
        console.log("DB connection issues");
        console.error(errOR);
        process.exit(1);
    } );
}


module.exports = DBconnect ; 