import React from "react";
import { MdWifiCalling1 } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c7a7153f-d6bd-457c-9514-285aac0d8c94",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent succesfully");
    } catch (error) {
      toast.error("error occured");
    }
  };

  return (
    <>
      <div className="">
        <div className=" mb-10 mt-20 flex justify-center items-center flex-col w-[80%]  md:w-[60%] mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold">Contact Us</h1>
            <p>Any question or remarks? Just write a message!</p>
          </div>

          <div className=" hover:shadow-xl  rounded-xl w-full flex flex-col md:flex-row justify-start mt-10 bg-white">
            <div className="bg-black text-white md:w-[40%] border-2 border-black rounded-xl p-4 space-y-4">
              <h2 className="text-4xl font-bold">Contact Information</h2>
              <p className="text-gray-400">
                say somthing to start a live chat!
              </p>

              <div className="space-y-3">
                <p className="flex gap-6">
                  <span>
                    <MdWifiCalling1 size={30} />
                  </span>{" "}
                  +91 93801XXXXX
                </p>
                <p className="flex gap-6">
                  <span>
                    <AiFillMessage size={30} />
                  </span>{" "}
                  sainathdev@gmail.com
                </p>
                <p className="flex gap-6">
                  <span>
                    <MdOutlineLocationOn size={30} />
                  </span>{" "}
                  Belagavi, Karnataka, India
                </p>
              </div>
            </div>
            <div className="md:w-[60%] p-10   ">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    className="p-1 w-full border-2 border-gray-400 rounded-lg"
                    type="text"
                    name="username"
                    placeholder="Enter Name"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <span className="text-sm font-semibold text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <input
                    className="p-1 w-full border-2 border-gray-400 rounded-lg"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-sm font-semibold text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    className="p-1 w-full border-2 border-gray-400 rounded-lg"
                    placeholder="Enter Message"
                    name="message"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="text-sm font-semibold text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-black w-full text-white hover:border-black border-2  hover:bg-white hover:text-black  text-lg font-bold duration-300 px-3 py-2 mt-4 rounded-lg "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
