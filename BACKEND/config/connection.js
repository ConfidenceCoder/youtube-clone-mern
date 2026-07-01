
import mongoose from "mongoose";


export const connectdb =async()=>{
    try{

       const conn=await mongoose.connect(process.env.DB_URL);
       console.log("database connected successfully");
    }catch(err){
        console.log(`database connection error ${err.message}`);
        process.exit(1);
    }
}
