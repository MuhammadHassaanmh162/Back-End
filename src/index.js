// require('dotenv').config({path: './env'}) not consistance in type: module this is commonjs 
import connectDB from "./database/index.js";
//for importing dotenv using type:module approach
import dotenv from 'dotenv';
dotenv.config({
    path: './env'
})

const port = process.env.PORT || 3000;
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server listening at port ${port}`);
    })
    app.on("error",(error)=>{
        console.log("Error occurred in server listening: ",error);
        throw error;
    })
})
.catch((error)=>{
    console.log("DB Connection Error: ",error);

})