import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL)
       console.log('mongodb connection successful')

    }catch(error){
        console.log(error)
        console.log('error connecting mongodb')
    }
}