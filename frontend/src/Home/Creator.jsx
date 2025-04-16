import axios from "axios";
import React, { useEffect, useState } from "react";

const Creator = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
  console.log(apiUrl)
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        `${apiUrl}/api/users/admins`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setAdmin(data);
    };
    fetchAdmins();
  }, []);
  return (
    <>
      <div className="w-[88%] justify-between items-center align-middle mx-auto p-6">
        <h1 className="text-2xl mb-4 bg-blue-500 text-white font-semibold w-fit px-2 py-1 rounded-lg">Popular Creators</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-4 ">
          {admin && admin.length > 0 ? (
            admin.slice(0, 4).map((element) => {
              {
                console.log(element);
              }
              return (
                <div
                  className="  flex justify-center items-center"
                  key={element._id}
                >
                  <div className="">
                    <img
                      src={element.photo.url}
                      alt="blog"
                      className="md:w-56 md:h-56 w-40 h-40 object-cover border border-black rounded-full items-center "
                    />
                    <div className="text-center font-semibold ">
                      <p>{element.name}</p>
                      <p className="text-gray-600 text-xs">{element.role}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className=" flex items-center justify-center">Loading....</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Creator;
