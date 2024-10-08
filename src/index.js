// require('dotenv').config({path: './env'}) not consistance in type: module this is commonjs 
import connectDB from "./database/index.js";
//for importing dotenv using type:module approach
import dotenv from 'dotenv';
dotenv.config({
    path: './env'
})


connectDB();