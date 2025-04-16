import axios from "axios";
import React, { useState } from "react";

const CommentInput = (probs) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
  console.log(apiUrl)
  const [content, setContent] = useState("");
  console.log(probs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/blogs/addComment`,
        { postId: probs.id, userId: probs.userId, content: content, name: probs.name }
      );

      console.log(data);
      setContent("");
    } catch (error) {
      console.log(error, "Error in adding comment");
    }
  };
  return (
    <>
      <div className=" m-2">
        <form
          onSubmit={handleSubmit}
          className="flex border rounded-lg gap-4 items-center"
          >
          <img className="rounded-full w-14 h-14 border-2 border-blue-600" src={probs.pic} alt="" />

          <div className="w-full relative">
            <input
              className="w-full rounded-3xl p-3"
              type="text"
              placeholder="Add comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="absolute
              right-2
              top-1/2
              transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-xl"
              type="submit"
              >
              {" "}
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentInput;
