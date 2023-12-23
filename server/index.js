import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/userrout.js'
import authRouter from './routes/authrout.js'
import blogRouter from './routes/blogrout.js'
import cookieParser from "cookie-parser";
import path from "path";

console.log(path);


dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to DataBase");
}).catch((err) => {
    console.log(err);
})

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,'client' , 'dist','index.html'))
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
})

