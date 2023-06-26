const mongoose = require("mongoose");

// TASK MANAGER -> DB name (dont use space in uri)
// after adding items only, the db will be created


// to start the server after connecting the app with db
const connectDB = (uri) => {
    // this returns promise
    return mongoose.connect(uri, {
        // to avoid deprecation warnings
        useNewUrlParser: true,
        useUnifiedTopology: true    
        });
        // .then((res) => {
        //     console.log("Connected to db");
        // })
        // .catch((err) => {
        //     console.log("Error occured");
        // });
}

module.exports = connectDB;

