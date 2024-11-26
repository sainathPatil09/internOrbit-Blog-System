import React from "react";
import { useAuth } from "../context/AuthProvider";
import {Link} from 'react-router-dom'

const Blogs = () => {
  const { blogs } = useAuth();
  return (
    <>
      <div>
        <div className="w-[88%] justify-between items-center mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">All Blogs goes here!</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 ">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <Link to={`/blog/${blog._id}`} key={index} className="">
                  <div className="rounded-xl overflow-hidden   w-84 shadow-xl h-52">
                    <div className="group relative h-full">
                      <img
                        className="w-full h-full object-cover"
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
              <div>asd</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
