import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/index';

export const Home = ({refreshTrigger}) => {
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/videos/random');
        setVideoData(res.data);
      } catch (err) {
        console.error("video fetch error:", err);
      }
    };
    fetchVideos();
  }, [refreshTrigger]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-9 p-4 sm:p-6">
      {videoData.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </div>
  );
};