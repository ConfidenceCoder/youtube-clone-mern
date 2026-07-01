import React, { useState } from 'react';
import { API_URLS } from '../config/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../config/supabaseClient';

export const Upload = ({ setIsUploadOpen }) => {
  const [addTitle, setAddTitle] = useState("")
  const [addDescription, setAddDescription] = useState("")
  const [addTags, setAddTags] = useState("")
  const [videoUrl, setVideoUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const uploadToSupabase = async (file, fileType) => {

    if (!file) return;
    setUploading(true);
    try {
      const cleanFileName = file.name.replace(/\s+/g, '-');
      const uniqueFileName = `${Date.now()}-${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('video')
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('video')
        .getPublicUrl(uniqueFileName);

      if (fileType === "video") {
        setVideoUrl(urlData.publicUrl)
        console.log("✅ Video Uploaded! URL:", urlData.publicUrl);
      }
      else if (fileType === "image") {
        setImgUrl(urlData.publicUrl);
        console.log("✅ Thumbnail Uploaded! URL:", urlData.publicUrl);
      }

    } catch (error) {
      console.error("❌ Upload failed:", error.message);
      alert("Error uploading file. Please check console.");
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl || !imgUrl) {
      alert("Please wait, files are still uploading to the cloud!");
      return;
    }

    try {
      const formattedTags = addTags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

      const res = await axios.post(API_URLS.VIDEOS, {
        title: addTitle,
        desc: addDescription,
        imgUrl,
        videoUrl,
        tags: formattedTags,
      },
        {
          withCredentials: true,
        });
      console.log("Database Entry Success:", res.data);
      setIsUploadOpen(false);
      setRefreshTrigger(prev => !prev);

      navigate('/');

    } catch (err) {
      console.error("Backend Error:", err);
      alert("Something went wrong while saving to database!");
    }
  }

  const handleCloseModal = async () => {
    try {
      if (videoUrl) {
        const videoFileName = videoUrl.split('/').pop();
        await supabase.storage.from('video').remove([videoFileName]);
        console.log("🗑️ Unused Video deleted from cloud");
      }

      if (imgUrl) {
        const imgFileName = imgUrl.split('/').pop();
        await supabase.storage.from('video').remove([imgFileName]);
        console.log("🗑️ Unused Thumbnail deleted from cloud");
      }
    } catch (error) {
      console.error("Error deleting unused files:", error);
    } finally {
      setIsUploadOpen(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-gray-900 rounded-lg p-8 flex flex-col gap-6 text-white border border-gray-700 shadow-2xl">

        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">Upload New Video</h1>
          <button
           onClick={handleCloseModal}
            disabled={uploading}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-colors text-white font-bold text-lg flex items-center justify-center border border-gray-700"
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">
            Video File {videoUrl && <span className="text-green-500 font-bold"> (Uploaded ✅)</span>}
          </label>
          <input
            type="file"
            accept="video/*"
            disabled={uploading}
            className={`bg-transparent border border-gray-700 p-2 rounded w-full transition-all ${uploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            onChange={(e) => uploadToSupabase(e.target.files[0], "video")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">
            Thumbnail Image {imgUrl && <span className="text-green-500 font-bold"> (Uploaded ✅)</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            className={`bg-transparent border border-gray-700 p-2 rounded w-full transition-all ${uploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            onChange={(e) => uploadToSupabase(e.target.files[0], "image")}
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          className="bg-transparent border border-gray-700 p-3 rounded outline-none focus:border-blue-500 w-full"
          onChange={(e) => setAddTitle(e.target.value)}
          value={addTitle}
        />

        <textarea
          placeholder="Description"
          rows={3}
          className="bg-transparent border border-gray-700 p-3 rounded outline-none focus:border-blue-500 resize-none w-full"
          onChange={(e) => setAddDescription(e.target.value)}
          value={addDescription}
        ></textarea>

        <input
          type="text"
          placeholder="Tags (Separate with commas)"
          className="bg-transparent border border-gray-700 p-3 rounded outline-none focus:border-blue-500 w-full"
          onChange={(e) => setAddTags(e.target.value)}
          value={addTags}
        />

        <button
          type='button'
          onClick={handleSubmit}
          disabled={uploading || !videoUrl || !imgUrl}
          className={`font-semibold py-3 rounded transition-colors w-full text-white
            ${(uploading || !videoUrl || !imgUrl)
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {uploading ? "Processing Files..." : "Upload Video"}
        </button>

      </div>
    </div>
  );
};