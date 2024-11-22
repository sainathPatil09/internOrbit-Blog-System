import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      let token = localStorage.getItem("jwt");
      console.log(token, "in fetchProfile");

      if (token) {
        try {
          const { data } = await axios.get(
            "http://localhost:4001/api/users/my-profile",
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

    const fetchData = async () => {
      await fetchProfile();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
