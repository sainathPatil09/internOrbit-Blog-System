import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

const Details = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
  console.log(apiUrl)
  const { id } = useParams();
  const { profile } = useAuth();
  const [blogs, setBlogs] = useState({});
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  console.log(profile);
  console.log(comments);
  console.log(likeCount, " total Likes")
  console.log(liked)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Please fill required fields");
      }
    };

    const fetchComment = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/blogs/getComment/${id}`
        );
        // console.log(data)
        setComments(data);
      } catch (error) {
        console.log("Error fetch comment", error);
      }
    };

    const fetchLikes =async ()=>{
        try {
            const {data} = await axios.get(`${apiUrl}/api/blogs/getLike/${id}`)
            console.log(data)
            setLikeCount(data.length)
            likedFun(data)
        } catch (error) {
            console.log("Error fetching Likes", error);
        }
    }

    const fetchData = () => {
      fetchBlog();
      fetchComment();
      fetchLikes()
    };
    fetchData();
  }, [id]);

  const likedFun=(data)=>{
    console.log(data)
    const res = data.filter((curData)=>{
        return curData.userId === profile._id
    })
    if(res.length>0){
        console.log(res , " found") 
        setLiked(true)
    }else{
        setLiked(false)
    }
}

const handleLike=(e)=>{
    if(liked){
        setLikeCount(likeCount-1);
        setLiked(false)
    }
    else{
        setLikeCount(likeCount+1);
        setLiked(true)
    }

}

  return (
    <div>
      <div>
        {blogs && (
          <section className="w-[88%] justify-between items-center mx-auto p-6">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blogs?.adminName}</p>
            </div>

            <div className="flex   flex-col md:flex-row gap-5 ">
                <div className="w-full">

              {blogs?.blogImage && (
                  <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="w-full md:h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                  />
                )}
                <div className="flex gap-2 items-center border border-gray-400 w-12 rounded-xl justify-center bg-pink-200">
                    {liked ? <FcLike onClick={handleLike} /> : <AiOutlineHeart onClick={handleLike} style={{ color: "gray" }} />}
                    {likeCount}
                </div>
                </div>
              <div className="border h-[300px] md:h-[500px] overflow-y-auto border-gray-500 rounded-xl w-full space-y-3">
                <CommentInput
                  name={profile.name}
                  pic={profile.photo.url}
                  id={id}
                  userId={profile._id}
                />
                {comments &&
                  comments.map((comment) => {
                    return (
                      <Comment
                        name={comment.name}
                        key={comment._id}
                        content={comment.content}
                      />
                    );
                  })}
              </div>
            </div>
            <div className=" w-full md:pl-6 ">
              <p className="text-lg mb-6">{blogs?.about}</p>
              {/* Add more content here if needed */}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Details;
