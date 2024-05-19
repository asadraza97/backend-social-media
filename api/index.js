import express from 'express'
import morgan from 'morgan'
import dotenv from "dotenv"
import helmet from 'helmet'
import mongoose from './db/index.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'


dotenv.config();

mongoose.connection.on("open", ()=>{
    console.log("db connected to the social media");
})

const app = express()
const port = 3000

// middleware  // 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// Api Routes //
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
