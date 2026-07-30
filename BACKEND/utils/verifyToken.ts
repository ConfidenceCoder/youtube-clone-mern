import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express';

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken =(req:AuthRequest,res:Response,next:NextFunction)=>{
    
    const token = req.cookies.access_token;

    if(!token){
        return res.status(401).json({message:"You are not authenticated!"})
    }

    jwt.verify(token,process.env.JWT_SECRET as string ,(err:any,user:any)=>{

        if(err){
            return res.status(403).json({message:"token is not valid!"});
        }
        req.user = user;

        next();
    })

}