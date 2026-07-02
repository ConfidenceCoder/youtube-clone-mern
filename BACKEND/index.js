import express from 'express';
import { connectdb } from './config/connection.js';
import 'dotenv/config'
import { authRouter,commentRouter,videoRouter,userRouter } from './routes/index.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://youtube-clone-mern-ochre.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser())

app.use("/api/auth",authRouter);
app.use("/api/users", userRouter);
app.use("/api/videos",videoRouter);
app.use("/api/comments",commentRouter)

app.listen(process.env.PORT,()=>{
    connectdb();
    console.log(`server is running on port ${process.env.PORT}`)

})

app.use((error,req,res,next)=>{
    const status = error.status || 500;

    const message = error.message || "something went wrong";

    return res.status(status).json({
        success:false,
        status:status,
        message:message,
    })
})