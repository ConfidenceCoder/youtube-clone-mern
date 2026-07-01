import { wrapAsync } from "../utils/wrapAsync.js"
import { User, Video } from "../models/index.js";


export const addVideo = wrapAsync(async (req, res) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    await newVideo.save();
    res.status(200).json(newVideo);
})

export const getVideo = wrapAsync(async (req, res) => {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
        return res.status(404).json({ message: "video not found" });
    }
    res.status(200).json(video);
})

export const addViews = wrapAsync(async (req, res) => {
    const videoid = req.params.id;
    const videocount = await Video.findByIdAndUpdate(videoid, { $inc: { views: 1 } });
    res.status(200).json("The view has been increased.");
})

export const trend = wrapAsync(async (req, res) => {
    const trandingVideo = await Video.find().sort({ views: -1 });
    res.status(200).json(trandingVideo);
})

export const random = wrapAsync(async (req, res) => {
    const randomvideo = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(randomvideo);
})

export const subsChannelFeed = wrapAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    const subscribedChannel = user.subscribedUsers;
    const list = await Video.find({ userId: { $in: subscribedChannel } }).sort({ createdAt: -1 });
    res.status(200).json(list);
}) 

export const likeVideo =wrapAsync( async(req,res)=>{
    const userId = req.user.id;
    const videoId = req.params.videoId;

      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes :userId},
        $pull:{dislikes:userId},
        }
    )
    res.status(200).json("The video has been liked.")

})

export const disLikeVideo =wrapAsync( async(req,res)=>{
    const userId = req.user.id;
    const videoId = req.params.videoId;

      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes :userId},
        $pull:{likes:userId},
        }
    )
    res.status(200).json("The video has been disLiked.")

})

