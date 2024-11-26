import axios from "axios";
import React, { useEffect, useState } from "react";

const Creators = () => {
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/admins",
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
      <div className="w-[88%] justify-between items-center mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 bg-red-300 text-white w-fit px-2 py-1 rounded-lg">Popular Creators</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
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
                      className="w-56 h-56 object-cover border border-black rounded-full items-center "
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
    </>
  );
};

export default Creators;
