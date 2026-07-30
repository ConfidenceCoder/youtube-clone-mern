import { Video } from "../models/videoSchema.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { Request,Response } from "express";
import { Comment } from "../models/index.js";

export interface AuthRequest extends Request{
    user?:{id:string};
}

export const addComment = wrapAsync(async(req:AuthRequest,res:Response)=>{

    const {videoId,desc} = req.body;
if (!req.user) return res.status(401).json({ message: "Not authenticated!" });
     const newComment = new Comment({
        userId:req.user.id,
        videoId,
        desc,
     })
  const savedComment = await newComment.save();

       res.status(200).json(savedComment);
})

export const getComment = wrapAsync(async(req:AuthRequest,res:Response)=>{
    
    const videoId = req.params.videoId;

    const videoComment = await Comment.find({videoId:videoId});

    res.status(200).json(videoComment);
})

export const deleteComment = wrapAsync(async(req:AuthRequest,res:Response)=>{
    if (!req.user) return res.status(401).json({ message: "Not authenticated!" });
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
        return res.status(404).json({ message: "Comment not found!" });
    }
        const video = await Video.findById(comment.videoId);
        if (!video) {
        return res.status(404).json({ message: "Video not found!" });
    }

    if(req.user.id === comment.userId.toString() || req.user.id === video.userId.toString()){

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted.")
    }else{
        return res.status(403).json({message:"You can delete only your comment or comments on your video!"})
    }

});