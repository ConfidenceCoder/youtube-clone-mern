import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../config/Utils'

export const Card = ({ video }) => {
  const [channel, setChannel] = useState({});

  const timeAgo = formatRelativeTime(video.createdAt);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.error("channel fetch error", err);
      }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} className="group cursor-pointer block">
      <div className="flex flex-col">

        <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-800">
          <img
            src={video.imgUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
          />

        </div>

        <div className="flex gap-3 mt-3">

          <div className="flex-shrink-0">
            <img
              src={
                channel?.img ||
                `https://ui-avatars.com/api/?name=${channel?.name || channel?.username || 'U'}&background=random&color=fff&size=128`
              }
              alt="channel-avatar"
              className="w-9 h-9 rounded-full object-cover bg-gray-700 m-0"
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1">

            <h3 className="text-white text-[15px] font-medium leading-snug line-clamp-2 mb-1 group-hover:text-gray-300 transition-colors">
              {video.title}
            </h3>

            <div className="flex items-center justify-between gap-2">
              <span className="text-gray-400 text-[13px] hover:text-white transition-colors truncate">
                {channel.username || "Unknown Channel"}
              </span>
              <span className="text-gray-400 text-[13px] flex-shrink-0 flex items-center gap-1">
                {video.views || 0} views
                <span className="text-[10px]">•</span>
                {timeAgo}
              </span>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
};