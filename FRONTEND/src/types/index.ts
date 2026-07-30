export interface userType {
    _id:string;
    username:string;
    email:string;
    img?:string;
    subscribers:number;
    subscribedUsers:string[];
    fromGoogle:boolean;
    createdAt:string;
    updatedAt:string;
}

export interface videoType {
    _id:string;
    userId:string;
    title:string;
    desc:string;
    imgUrl:string;
    videoUrl:string;
    tags:string[];
    likes:string[];
    dislikes:string[];
    createdAt:string;
    updatedAt:string;
    views:number;
}

export interface commentType {
    _id:string;
    userId:string;
    videoId:string;
    desc:string;
    createdAt:string;
    updatedAt:string;
}