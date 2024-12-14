import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blogs from "./pages/Blogs";
import Creators from "./pages/Creators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Details from "./pages/Details";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/login", "/register", "/dashboard"].includes(
    location.pathname
  );

  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>loading ...........</div>;
  }

  return (
    <>
    <div className="bg-blue-100">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated === true ? <Home /> : <Navigate to={"/login"} />
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/creators" element={<Creators />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route exact path='/blog/update/:id' element={<UpdateBlog/>} />
        <Route exact path='/blog/:id' element={<Details/>} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer/>}
      </div>
    </>
  );
}

export default App;
