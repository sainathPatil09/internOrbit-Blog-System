import axios from "axios";
import React, { useEffect, useState } from "react";

const Creators = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
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
      <div className="bg-blue-50">
      <div className="h-1 bg-blue-500"></div>
        <div className="w-[88%] justify-between items-center mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4 bg-red-300 text-white w-fit px-2 py-1 rounded-lg">
            Popular Creators
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4  gap-4">
            {admin && admin.length > 0 ? (
              admin.slice(0, admin.length).map((element) => {
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
                        className="md:w-56 md:h-56 w-36 h-36 object-cover border border-black rounded-full items-center "
                      />
                      <div className="text-center font-semibold ">
                        <p>{element.name}</p>
                        <p className="text-gray-600 text-xs">{element.role}</p>
                        <p className="text-gray-600 text-xs">{element.email}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div> wasd</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Creators;
