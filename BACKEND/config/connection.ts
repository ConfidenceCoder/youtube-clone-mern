
import mongoose from "mongoose";


export const connectdb =async()=>{
    try{

       const conn = await mongoose.connect(process.env.DB_URL as string);
       console.log("database connected successfully");
    }catch(err){
        const error = err as Error;
        console.log(`database connection error ${error.message}`);
        process.exit(1);
    }
}
