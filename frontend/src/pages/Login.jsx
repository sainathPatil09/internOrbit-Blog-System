import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const apiUrl = window.env?.VITE_REACT_APP_API_URL
  console.log(apiUrl)
  const navigateTo = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // if(!email || !password || !role){
    //   toast.error("Please fill all fields")
    // }
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Logined Succesfully");
      setProfile(data);
      setIsAuthenticated(true);

      setEmail("");
      setPassword("");
      setRole("");
      setTimeout(() => {
        navigateTo("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Please fill required fields");
    }
  };

  return (
    // <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
    <div className="">
      <div className="min-h-screen flex items-center justify-center absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] p-2">
        <div className="w-full max-w-md p-8 shadow-sm bg-gray-900 text-white rounded-xl">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-3xl items-center text-center">
              cilli<span className="text-blue-500">Blog</span>
            </div>

            <h1 className="font-semibold mb-6 text-xl">Login</h1>

            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="w-full p-2 rounded-md mb-4 border text-white bg-gray-800"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                value={email}
                className="w-full p-2 rounded-md border text-white bg-gray-800"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your Password"
                value={password}
                className="w-full p-2 rounded-md border text-white bg-gray-800"
              />
            </div>

            <p className="text-center mb-4">
              New User?{" "}
              <Link to={"/register"} className="text-blue-500">
                Register Now
              </Link>
            </p>

            <button
              type="submit"
              className="w-full font-semibold bg-blue-500 p-2 hover:bg-blue-700 duration-300 rounded-md  text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
