// const { createServer } = require('node:http');
// import {Server} from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.config.js"; // adjust path if needed
connectDB();

import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected");
    app.listen(process.env.PORT || 8080, ()=>{
        console.log("Server running on port", process.env.PORT || 8080);
    });
}).catch(err=>{
    console.error(err);
});