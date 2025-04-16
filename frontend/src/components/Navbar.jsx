import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
  console.log(apiUrl)

  const [show, setshow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, profile } = useAuth();
  console.log(profile);
  console.log(isAuthenticated);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${apiUrl}/api/users/logout`,
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      localStorage.removeItem("jwt");
      toast.success("Logout Succsefully");
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed in logout");
    }
  };

  return (
    <nav className="px-4 py-2 shadow-lg bg-blue-50">
      <div className=" flex items-center justify-between w-[88%] mx-auto">
        <div className="font-semibold text-xl">
          cilli<span className="text-blue-500">Blog</span>
        </div>
        {/* {Desktop} */}
        <div className="mx-6">
          <ul className="space-x-6 hidden md:flex ">
            <Link className="hover:text-blue-700 font-semibold" to="/">
              HOME
            </Link>
            <Link className="hover:text-blue-700 font-semibold" to="/blogs">
              BLOGS
            </Link>
            <Link className="hover:text-blue-700 font-semibold" to="/creators">
              CREATORS
            </Link>
            <Link className="hover:text-blue-700 font-semibold" to="/about">
              ABOUT
            </Link>
            <Link className="hover:text-blue-700 font-semibold" to="/contact">
              CONTACT
            </Link>
          </ul>

          <div className="md:hidden" onClick={() => setshow(!show)}>
            {show ? <IoClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>
        <div className="space-x-2 hidden md:flex">
          {isAuthenticated && profile?.role === "admin" ? (
            <Link
              to="/dashboard"
              className="bg-blue-500 hidden md:flex px-4 py-2 font-semibold text-white rounded-md hover:bg-blue-700"
            >
              DASHBOARD
            </Link>
          ) : (
            ""
          )}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-red-500 hidden md:flex px-4 py-2 font-semibold text-white rounded-md hover:bg-red-700"
            >
              LOGIN
            </Link>
          ) : (
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hidden md:flex px-4 py-2 font-semibold text-white rounded-md hover:bg-red-700"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>


      {/* {Mobile navbar} */}
      {
        show && (
          <div className='bg-white '>
            <ul className=' flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl '>
              <Link className='hover:text-blue-700 font-semibold' onClick={() => setshow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to='/'>HOME</Link>
              <Link className='hover:text-blue-700 font-semibold' onClick={() => setshow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to='/blogs'>BLOGS</Link>
              <Link className='hover:text-blue-700 font-semibold' onClick={() => setshow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to='/creators'>CREATORS</Link>
              <Link className='hover:text-blue-700 font-semibold' onClick={() => setshow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to='/about'>ABOUT</Link>
              <Link className='hover:text-blue-700 font-semibold' onClick={() => setshow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to='/contact'>CONTACT</Link>
              <div className='flex flex-col justify-center items-center gap-2'>
                {isAuthenticated && profile?.role === 'admin' ? (
                  <Link to='/dashboard'
                    className='bg-blue-500  px-4 py-2 font-semibold text-white rounded-md hover:bg-blue-700'>
                    DASHBOARD
                  </Link>
                ) : ("")}

                {!isAuthenticated ? (<Link to='/login'
                  className='bg-red-500 px-4 py-2 font-semibold text-white rounded-md hover:bg-red-700'>
                  LOGIN
                </Link>) : (<div>
                  <button
                    onClick={handleLogout}
                    className='bg-red-500 px-4 py-2 font-semibold text-white rounded-md hover:bg-red-700'>

                    LOGOUT
                  </button>
                </div>)}



              </div>

            </ul>
          </div>
        )
      }
    </nav>
    // <></>
  );
};

export default Navbar;
