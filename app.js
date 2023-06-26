// to execute the connect.js to connect with db
// require("./db/connect.js");

const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");
// model
const tasksRouter = require("./routes/tasks.js");
// to access secret var in .env
// without config() -> can't use the var in .env files through process.env.var
require("dotenv").config();


const start = async () => {
    // there must be catch block while using try block -> else error occurs
    try {
        // connectDB() returns promise
        await connectDB(process.env.MONGO_URI);
        console.log("connected to db");
        // after connecting to db
        app.listen(3000, () => {
            console.log("Server is listening at port 3000");
        });
    } catch(err) {
        console.log(err);
    }
} 

start();

// convention for API routes (base) -> /api/v1

// for serving static files to client
app.use(express.static("public"))
// for sending json from client to server
app.use(express.json());
// for setting app to use routers
app.use("/api/v1/tasks", tasksRouter);

// home page (as the file name index.html this will be defaultly served)
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html");
// });

// controllers & routers are important as app grows bigger to be sustainable
// we can also do like this - app.listen(3000, console.log("Sever is listening at port 3000"));