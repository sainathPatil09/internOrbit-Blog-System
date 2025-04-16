import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
  console.log(apiUrl)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState()

  useEffect(() => {
    const fetchProfile = async () => {
      let token = localStorage.getItem("jwt");
      console.log(token, "in fetchProfile");

      if (token) {
        try {
          const { data } = await axios.get(
            `${apiUrl}/api/users/my-profile`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data);
          setProfile(data);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          localStorage.removeItem("jwt");
          setIsAuthenticated(false);
        }
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/blogs/all-blogs`,
          { withCredentials: true }
        );
        console.log(data)
        setBlogs(data);
      } catch (error) {
        console.log(error)
      }
    };

    const fetchData = async () => {
      await fetchProfile();
      await fetchBlogs();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        loading,
        blogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
