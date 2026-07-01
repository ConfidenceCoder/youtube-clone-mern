import express from 'express'
import { addComment,deleteComment,getComment } from '../controllers/index.js'
import { verifyToken } from '../utils/verifyToken.js';


 export const commentRouter = express.Router()

    commentRouter.post("/",verifyToken,addComment);

    commentRouter.get("/:videoId",getComment);

    commentRouter.delete("/:id",verifyToken,deleteComment);

