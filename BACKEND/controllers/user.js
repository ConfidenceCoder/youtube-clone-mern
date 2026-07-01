import { User } from "../models/userSchema.js";
import { Video } from "../models/videoSchema.js";
import { wrapAsync } from "../utils/wrapAsync.js";


export const getUser = wrapAsync(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
})

export const subscribe = wrapAsync(async(req,res)=>{

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

export const unsubscribe = wrapAsync(async(req,res)=>{

      await User.findByIdAndUpdate(req.user.id,{
        $pull:{subscribedUsers : req.params.id}
      })
      
      await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:-1},
      });
      
        res.status(200).json("Unsubscription successful.");
})