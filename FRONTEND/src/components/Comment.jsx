import React, { useEffect, useState } from 'react'
import { API_URLS } from '../config/api';
import axios from 'axios';

export const Comment = ({comment}) => {
    const [user,setUser] =useState({});

   useEffect(() => {
    const fetchCommentDetail = async () => {
      if (!comment?.userId) return;

      try {
        const res = await axios.get(`${API_URLS.USERS}/find/${comment.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching comment user:", err);
      }
    };
    
    fetchCommentDetail();
  }, [comment?.userId]);

 return (
    <div className="flex gap-4">
      <img
        src={
          user?.img || 
          `https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random&color=fff&size=128`
        }
        alt="user"
        className="w-10 h-10 rounded-full object-cover bg-gray-700 flex-shrink-0"
      />
      
      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {user?.username || "Loading..."}
        </span>
        
        <span className="text-sm text-gray-300 mt-1">
          {comment?.desc}
        </span>
      </div>
    </div>
  );
}
