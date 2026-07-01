import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { API_URLS } from './../config/api';
import { Comment } from '../components/index.jsx'
import { subscription } from '../redux/useSlice.js'
import { dummyRecommendations } from '../config/Utils.js'

export const Video = () => {

  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);


  const [currentVideo, setCurrentVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const hasViewed = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchVideoData = async () => {
      try {

        const videoRes = await axios.get(`${API_URLS.VIDEOS}/find/${id}`);
        setCurrentVideo(videoRes.data);

        if (!hasViewed.current) {
          await axios.put(`${API_URLS.VIDEOS}/view/${id}`)
          hasViewed.current = true;
        }

        const channelRes = await axios.get(`${API_URLS.USERS}/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);

        const commentRes = await axios.get(`${API_URLS.COMMENTS}/${id}`);
        setComments(commentRes.data)

      } catch (err) {
        console.error("Error fetching video data:", err)
      }
    }
    fetchVideoData();

    return () => {
      hasViewed.current = false;
    };

  }, [id])

  const handleLike = async () => {
    if (!currentUser) return;

    setCurrentVideo((prevVideo) => {
      const isAlreadyLiked = prevVideo.likes.includes(currentUser._id);

      if (isAlreadyLiked) {
        return {
          ...prevVideo,
          likes: prevVideo.likes.filter((id) => id !== currentUser._id)
        };
      } else {
        return {
          ...prevVideo,
          likes: [...prevVideo.likes, currentUser._id],
          dislikes: prevVideo.dislikes.filter((id) => id !== currentUser._id)
        };
      }
    });

    try {
      await axios.put(`${API_URLS.VIDEOS}/like/${id}`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Like failed", err);
    }
  };


  const handleDislike = async () => {
    if (!currentUser) return;

    setCurrentVideo((prevVideo) => {
      const isAlreadyDisliked = prevVideo.dislikes.includes(currentUser._id);

      if (isAlreadyDisliked) {
        return {
          ...prevVideo,
          dislikes: prevVideo.dislikes.filter((id) => id !== currentUser._id)
        };
      } else {
        return {
          ...prevVideo,
          dislikes: [...prevVideo.dislikes, currentUser._id],
          likes: prevVideo.likes.filter((id) => id !== currentUser._id)
        };
      }
    });

    try {
      await axios.put(`${API_URLS.VIDEOS}/dislike/${id}`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Dislike failed", err);
    }
  };


  const handleSubscribe = async () => {
    if (!currentUser) return;

    const isSubscribed = currentUser.subscribedUsers.includes(channel._id);

    dispatch(subscription(channel._id));

    setChannel((prevChannel) => ({
      ...prevChannel,
      subscribers: isSubscribed ? prevChannel.subscribers - 1 : prevChannel.subscribers + 1,
    }));

    try {
      if (isSubscribed) {
        await axios.put(`${API_URLS.USERS}/unsub/${channel._id}`, {}, { withCredentials: true });
      } else {
        await axios.put(`${API_URLS.USERS}/sub/${channel._id}`, {}, { withCredentials: true });
      }
    } catch (err) {
      console.error("subscription failed", err);

      dispatch(subscription(channel._id));
      setChannel((prevChannel) => ({
        ...prevChannel,
        subscribers: isSubscribed ? prevChannel.subscribers + 1 : prevChannel.subscribers - 1,
      }));
    }
  };



  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment) return;

    try {
      const res = await axios.post(API_URLS.COMMENTS, {
        desc: newComment,
        videoId: id,
      }, { withCredentials: true })

      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  }


  return (

    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 bg-gray-900 min-h-screen text-white">

      <div className="flex-1 lg:w-[70%]">

        <div className="w-full bg-black rounded-xl overflow-hidden aspect-video">

          <video
            src={currentVideo.videoUrl}
            controls
            className="w-full h-full object-contain"
          ></video>

        </div>
        <h1 className="text-xl md:text-2xl font-bold mt-4 mb-2 line-clamp-2">
          {currentVideo.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

          <div className="flex items-center gap-4">

            <img
              src={
                channel?.img ||
                `https://ui-avatars.com/api/?name=${channel?.name || channel?.username || 'U'}&background=random&color=fff&size=128`
              }
              alt="channel-avatar"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover bg-gray-800"
            />

            <div>
              <h2 className="font-semibold text-sm md:text-base leading-tight">{channel.name}</h2>
              <p className="text-gray-400 text-xs">{channel.subscribers} subscribers</p>
            </div>

            {currentUser?._id !== channel._id && (
              <button
                onClick={handleSubscribe}
                className={`ml-2 md:ml-4 px-4 py-2 rounded-full font-semibold text-sm transition-colors 
      ${currentUser?.subscribedUsers?.includes(channel._id)
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-black hover:bg-gray-200"
                  }`
                }
              >
                {currentUser?.subscribedUsers?.includes(channel._id) ? "Subscribed" : "Subscribe"}
              </button>)}

          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">

            <div className="flex items-center bg-gray-800 rounded-full overflow-hidden flex-shrink-0">

              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 border-r border-gray-700 transition-colors text-sm font-medium">
                👍 {currentVideo.likes?.length || 0}
              </button>
              <button
                onClick={handleDislike}
                className="px-4 py-2 hover:bg-gray-700 transition-colors text-sm font-medium">
                👎  {currentVideo.dislikes?.length || 0}
              </button>
            </div>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm font-medium flex-shrink-0">
              🔗 Share
            </button>
            <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm font-medium flex-shrink-0">
              ➕ Save
            </button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-sm whitespace-pre-wrap">

          <span className="font-bold mr-2">{currentVideo.views}</span>
          <p className="mt-2 text-gray-300">
            {currentVideo.desc}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">{comments.length} Comments</h3>


          {currentUser ? (
            <div className="flex gap-4 mb-8">
              <img
                src={currentUser?.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwaRbnR8lS1iNqY_rM5qgHn-P2y35GgJ9kKw&s"}
                alt="current-user"
                className="w-10 h-10 rounded-full object-cover"
              />
              <form onSubmit={handleAddComment} className="w-full flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="bg-transparent border-b border-gray-600 focus:border-white outline-none w-full pb-1 text-sm transition-colors"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                  Post
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <span className="text-gray-400 text-sm">Sign in to add a comment</span>
              <Link to="/signin" className="text-blue-500 text-sm font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>

      </div>

      <div className="lg:w-[30%] flex flex-col gap-4 mt-6 lg:mt-0">
        {dummyRecommendations.map((video) => (
          <div key={video._id} className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <img
              src={video.imgUrl}
              alt="thumb"
              className="w-40 h-24 object-cover rounded-lg bg-gray-700 flex-shrink-0"
            />

            <div className="flex flex-col pr-2">
              <h4 className="text-sm font-semibold line-clamp-2 leading-tight">
                {video.title}
              </h4>
              <span className="text-xs text-gray-400 mt-1">
                {video.channelName}
              </span>
              <span className="text-xs text-gray-400">
                {video.views} views • {video.time}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>

  )
}
