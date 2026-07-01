import express from 'express';
import { googleAuth,signin,signup,logout } from '../controllers/index.js';


 export const authRouter = express.Router();

authRouter.post('/signup' ,signup);

authRouter.post('/signin',signin);

authRouter.post('/googleauth',googleAuth);

authRouter.post('/logout',logout)
