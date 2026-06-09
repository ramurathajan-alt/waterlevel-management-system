import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import gateRouter from './routes/gateRoutes.js';
import alertRouter from './routes/alertRoutes.js';
import smsRouter from './routes/smsRoutes.js';
import dotenv from "dotenv";

dotenv.config();



//app config
const app = express()
const port = process.env.PORT || 4000;


//middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`, req.body);
  next();
});


// DB connection
connectDB();

//api endpoints
app.use("/api/user",userRouter)
app.use("/api/gates", gateRouter);
app.use("/api/alerts", alertRouter);
app.use("/api/sms", smsRouter);


app.get("/",(req,res)=>{
    res.send("API Working")
})



app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


