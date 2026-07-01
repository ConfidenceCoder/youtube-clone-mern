import { Video } from "../models/videoSchema.js";
import { wrapAsync } from "../utils/wrapAsync.js";

import { User,Comment } from "../models/index.js";

export const addComment = wrapAsync(async(req,res)=>{

    const {videoId,desc} = req.body;

     const newComment = new Comment({
        userId:req.user.id,
        videoId,
        desc,
     })
  const savedComment = await newComment.save();

       res.status(200).json(savedComment);
})

export const getComment = wrapAsync(async(req,res)=>{
    
    const videoId = req.params.videoId;

    const videoComment = await Comment.find({videoId:videoId});

    res.status(200).json(videoComment);
})

export const deleteComment = wrapAsync(async(req,res)=>{

        const comment = await Comment.findById(req.params.id);

        const video = await Video.findById(comment.videoId);

    if(req.user.id === comment.userId.toString() || req.user.id === video.userId.toString()){

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted.")
    }else{
        return res.status(403).json({message:"You can delete only your comment or comments on your video!"})
    }

});