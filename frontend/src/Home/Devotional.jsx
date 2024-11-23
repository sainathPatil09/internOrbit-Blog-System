import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");
  return (
    <>
      <div>
        <div className="w-[88%] justify-between items-center mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Devotional</h1>
          <p className="text-center mb-4">
            The concept of Gods varies widely across different cultures,
            religions and belif system
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            {devotionalBlogs && devotionalBlogs.length > 0 ? (
              devotionalBlogs.map((blog, index) => (
                <Link to={`/blog/${blog._id}`} key={index}>
                  <div className="rounded-xl overflow-hidden  w-84 shadow-xl">
                    <div className=" group relative">
                      <img
                        className="w-full object-cover"
                        src={blog?.blogImage.url}
                        alt="Shoes"
                      />
                      <h1 className="absolute text-black font-semibold bottom-1 left-3 text-md group-hover:text-yellow-400 transition-colors duration-300">
                        {blog?.title}{" "}
                      </h1>
                      <h2 className="absolute text-black font-semibold bottom-6 left-3 text-xl group-hover:text-yellow-400 transition-colors duration-300">
                        {blog?.category}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className=" flex items-center justify-center">
                Loading....
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Devotional;
