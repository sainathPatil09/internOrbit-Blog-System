import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  console.log(apiUrl)
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    console.log(blogImage);

    try {
      const { data } = await axios.post(
        `${apiUrl}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "Blog Posted Succesfully");
      setTitle("");
      setAbout("");
      setCategory("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Please fill required fields");
    }
  };

  return (
    <>
      <div>
        <div className=" p-4 min-h-screen flex items-center justify-center bg-gray-100 ">
          <div className="md:w-[50%] p-8 shadow-lg bg-white rounded-md">
            <form onSubmit={handleCreateBlog}>
              <h1 className="font-semibold mb-6 text-4xl">Create Blog</h1>

              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full p-2 rounded-md mb-4 border"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainmaent">Entertainmaent</option>
                <option value="Business">Business</option>
              </select>

              <div className="mb-4">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  className="w-full p-2 rounded-md border"
                />
              </div>

              <div
                onChange={(e) => setBlogImage(e.target.value)}
                className="flex items-center mb-4"
              >
                <div className="photo w-20 h-20 mr-4">
                  <img
                    src={blogImagePreview ? `${blogImagePreview}` : "blogImage"}
                    alt="photo"
                  />
                </div>
                <input
                  onChange={changePhotoHandler}
                  type="file"
                  className="w-full p-2 rounded-md mb-4 border"
                />
              </div>

              <div>
                <textarea
                  className="w-full p-2 rounded-md mb-4 border"
                  placeholder="write about blog"
                  rows="5"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 p-2 hover:bg-blue-700 duration-300 rounded-md  text-white"
              >
                Post Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
