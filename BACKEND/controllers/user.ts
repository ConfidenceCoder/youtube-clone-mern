import { User } from "../models/userSchema.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { Request,Response } from "express";

export interface AuthRequest extends Request {
    user?: { id: string };
}

export const getUser = wrapAsync(async(req:Request,res:Response)=>{
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json(user);
})

export const subscribe = wrapAsync(async(req:AuthRequest,res:Response)=>{
          if (!req.user) return res.status(401).json({ message: "Not authenticated!" });
                if(req.user.id===req.params.id){
                    return res.status(403).json({ message: "You cannot subscribe to your own channel!" });
                } 

      await User.findByIdAndUpdate(req.user.id,{
        $addToSet :{subscribedUsers : req.params.id}
      })
      
      await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1},
      });
      
        res.status(200).json("Subscription successful.");
})

export const unsubscribe = wrapAsync(async(req:AuthRequest,res:Response)=>{

if (!req.user) return res.status(401).json({ message: "Not authenticated!" });

      await User.findByIdAndUpdate(req.user.id,{
        $pull:{subscribedUsers : req.params.id}
      })
      
      await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:-1},
      });
      
        res.status(200).json("Unsubscription successful.");
})