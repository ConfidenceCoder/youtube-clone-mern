import express from 'express';
import { addVideo,getVideo,trend,random,subsChannelFeed,addViews,likeVideo,disLikeVideo } from '../controllers/index.js'
import { verifyToken } from '../utils/verifyToken.js';
export const videoRouter = express.Router();

videoRouter.post("/",verifyToken,addVideo);

videoRouter.get("/trend",trend);

videoRouter.get("/find/:id",getVideo);

videoRouter.put("/view/:id",addViews)

videoRouter.get("/random",random);

videoRouter.get("/sub",verifyToken,subsChannelFeed);

videoRouter.put("/like/:videoId", verifyToken, likeVideo);

videoRouter.put("/dislike/:videoId", verifyToken, disLikeVideo);