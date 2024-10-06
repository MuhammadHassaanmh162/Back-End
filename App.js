import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app =  express();
const port = process.env.PORT;

app.get("/",(req,res)=>{
        res.send("My Main Page")
})

app.get("/hassaan",(req,res)=>{
    res.send("<h1>Hello Hassaan</h1>")
})



//Server Listening here at port 3000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})