import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

const SideBar = ({ setComponent }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_NODE_ENV === "development" ?  import.meta.env.VITE_REACT_APP_API_URL : "/";
  console.log(apiUrl)
  const { profile, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);

  const navigateTo = useNavigate();
  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/users/logout`,
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      localStorage.removeItem("jwt");
      toast.success("Logout Succsefully");
      navigateTo("/login");
    } catch (error) {}
  };
  return (
    <>
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>
      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>
        <div className="text-center p-5">
          <img
            className="w-24 h-24 rounded-full mx-auto"
            src={profile?.photo?.url}
            alt=""
          />
          <p>{profile?.name}</p>
        </div>
        <ul className="space-y-3">
          <button
            className="bg-green-400 rounded-lg hover:bg-green-600 hover:text-white font-semibold transition duration-300 w-full px-4 py-2 "
            onClick={() => {
              handleComponents("My Blogs");
            }}
          >
            MY BLOGS
          </button>
          <button
            className="bg-blue-400 rounded-lg hover:bg-blue-600 hover:text-white font-semibold transition duration-300 w-full px-4 py-2 "
            onClick={() => {
              handleComponents("Create Blog");
            }}
          >
            CREATE BLOG
          </button>
          <button
            className="bg-yellow-400 rounded-lg hover:bg-yellow-600 hover:text-white font-semibold transition duration-300 w-full px-4 py-2 "
            onClick={() => {
              handleComponents("My Profile");
            }}
          >
            MY PROFILE
          </button>
          <button
            className="bg-violet-700 rounded-lg hover:bg-violet-900 hover:text-white font-semibold transition duration-300 w-full px-4 py-2 "
            onClick={gotoHome}
          >
            HOME
          </button>
          <button
            className="bg-red-500 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition duration-300 w-full px-4 py-2 "
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
