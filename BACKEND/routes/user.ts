import express from 'express'
import { getUser } from '../controllers/index.js';
import { subscribe } from '../controllers/user.js';
import { unsubscribe } from '../controllers/user.js';
import { verifyToken } from '../utils/verifyToken.js';

 export const userRouter = express.Router();

userRouter.get('/find/:id',getUser);

userRouter.put('/sub/:id', verifyToken, subscribe);

userRouter.put('/unsub/:id', verifyToken, unsubscribe);
