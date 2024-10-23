import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './DB/db.js'
import userRoute from './routes/userRoute.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000
connectDB()


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRoute)


app.get('/',(req,res)=>{
    res.send('bro working!!')
})

app.listen(PORT, () => {
    console.log('-----------------------------');
    console.log('-----------------------------');
    console.log(`server running on port `+PORT);
});