import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

//middleware configurations
//Allow urls
app.use(cors ({
    origin: process.env.CORS_URI,
    credentials: true
}))
//Allow json
app.use(express.json({
    limit: '16kb'
}))
//Allow urlencoded
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))
//Allow Static Files
app.use(express.static("public"))
//Cookie Parser
app.use(cookieParser());

//Route Import 
import userRouter from './routes/user.routes.js'


//Router Declaration

app.use("/api/v1/users", userRouter);

//http://localhost:8000/api/v1/users/register

export { app }