export const formatRelativeTime = (createdAtString) => {
  if (!createdAtString) return "";

  const videoDate = new Date(createdAtString);
  const currentDate = new Date();
  
  const diffInMs = currentDate - videoDate;

  if (diffInMs < 0) return "Just now";

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

export const dummyRecommendations = [
  {
    _id: "rec1",
    title: "Advanced MERN Stack Authentication in 2026",
    channelName: "CodeMaster",
    views: "120K",
    time: "1 week ago",
    imgUrl: "https://picsum.photos/seed/mern/160/90"
  },
  {
    _id: "rec2",
    title: "Mastering Dynamic Programming on LeetCode",
    channelName: "AlgoExpert",
    views: "85K",
    time: "3 days ago",
    imgUrl: "https://picsum.photos/seed/leetcode/160/90"
  },
  {
    _id: "rec3",
    title: "Top 5 AI Video Generators You Must Try",
    channelName: "AI Explorer",
    views: "210K",
    time: "2 weeks ago",
    imgUrl: "https://picsum.photos/seed/ai/160/90"
  },
  {
    _id: "rec4",
    title: "Money Heist Breakdown: The Mastermind Logic",
    channelName: "Cinephile",
    views: "1.2M",
    time: "1 month ago",
    imgUrl: "https://picsum.photos/seed/heist/160/90"
  },
  {
    _id: "rec5",
    title: "React Redux Toolkit Crash Course",
    channelName: "Frontend Masters",
    views: "45K",
    time: "3 days ago",
    imgUrl: "https://picsum.photos/seed/react/160/90"
  },
  {
    _id: "rec6",
    title: "Building a Real-time Chat App with Socket.io",
    channelName: "DevSpark",
    views: "67K",
    time: "5 days ago",
    imgUrl: "https://picsum.photos/seed/socket/160/90"
  },
  {
    _id: "rec7",
    title: "Perfect Your Badminton Smash Technique",
    channelName: "Pro Sports",
    views: "34K",
    time: "1 week ago",
    imgUrl: "https://picsum.photos/seed/badminton/160/90"
  },
  {
    _id: "rec8",
    title: "10 Hidden Details in 'Asur' You Missed",
    channelName: "Mystery Solved",
    views: "500K",
    time: "2 months ago",
    imgUrl: "https://picsum.photos/seed/asur/160/90"
  },
  {
    _id: "rec9",
    title: "Best 6:30 AM Gym Routine for Software Engineers",
    channelName: "FitDev",
    views: "12K",
    time: "10 hours ago",
    imgUrl: "https://picsum.photos/seed/gym/160/90"
  },
  {
    _id: "rec10",
    title: "MongoDB Aggregation Pipeline Explained",
    channelName: "Database Guru",
    views: "89K",
    time: "4 days ago",
    imgUrl: "https://picsum.photos/seed/mongo/160/90"
  },
  {
    _id: "rec11",
    title: "Crack any Coding Interview with this Strategy",
    channelName: "Tech Wizards",
    views: "340K",
    time: "1 year ago",
    imgUrl: "https://picsum.photos/seed/interview/160/90"
  },
  {
    _id: "rec12",
    title: "Next.js 15 Full Course 2026",
    channelName: "CodeWithMe",
    views: "90K",
    time: "2 days ago",
    imgUrl: "https://picsum.photos/seed/nextjs/160/90"
  }
];