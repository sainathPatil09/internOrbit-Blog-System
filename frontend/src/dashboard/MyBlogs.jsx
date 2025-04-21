import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const apiUrl = window.env?.VITE_REACT_APP_API_URL
  console.log(apiUrl)
  const [myBlogs, SetmyBlogs] = useState([]);
  console.log(myBlogs);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        console.log(data);
        SetmyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${apiUrl}/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        SetmyBlogs((value) => value.filter((blog) => blog._id !== id));
        navigateTo("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.message || "failed to delete blog");
      });
  };

  return (
    <>
      <div className="bg-white">
        <div className="container mx-auto my-12 p-4">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
            {myBlogs && myBlogs.length > 0 ? (
              myBlogs.map((element) => (
                <Link
                  to={`/blog/${element._id}`}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  key={element._id}
                >
                  {element?.blogImage && (
                    <img
                      src={element?.blogImage?.url}
                      alt="blogImg"
                      className="w-full h-48 object-cover "
                    />
                  )}
                  <div className="p-4">
                    <span className="text-sm text-gray-600">
                      {element.category}
                    </span>
                    <h4 className="text-xl font-semibold my-2">
                      {element.title}
                    </h4>
                    <div className="flex justify-between mt-4">
                      <Link
                        to={`/blog/update/${element._id}`}
                        className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                      >
                        UPDATE
                      </Link>
                      <button
                        onClick={() => handleDelete(element._id)}
                        className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have not posted any blog to see!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
