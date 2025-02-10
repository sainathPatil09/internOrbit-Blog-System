import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Comment from '../components/Comment';
import CommentInput from '../components/CommentInput';

const Details = () => {
    const { id } = useParams();
    const [blogs, setBlogs] = useState({})
    const{profile} = useAuth()
    console.log(profile)
    const [comments, setComments] = useState([])
    console.log(comments)
    useEffect(() => {

        const fetchBlog = async () => {

            try {
                const { data } = await axios.get(`http://localhost:4001/api/blogs/single-blog/${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(data);
                setBlogs(data);

            } catch (error) {
                console.log(error)
                toast.error("Please fill required fields")
            }
        }


        const fetchComment = async()=>{
            try {
                const {data} = await axios.get(`http://localhost:4001/api/blogs/getComment/${id}`)
                // console.log(data)
                setComments(data)
                
            } catch (error) {
                console.log("Error fetch comment", error)
            }
        }


        const fetchData=()=>{
            fetchBlog()
            fetchComment()
        }
        fetchData()
    }, [id]);
    
    return (
        <div>
            <div>
                {blogs && (
                    <section className="w-[88%] justify-between items-center mx-auto p-6">
                        <div className="text-blue-500 uppercase text-xs font-bold mb-4">
                            {blogs?.category}
                        </div>
                        <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
                        <div className="flex items-center mb-6">
                            <img
                                src={blogs?.adminPhoto}
                                alt="author_avatar"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <p className="text-lg font-semibold">{blogs?.adminName}</p>
                        </div>

                        <div className="flex   flex-col md:flex-row gap-5 ">
                            {blogs?.blogImage && (
                                <img
                                    src={blogs?.blogImage?.url}
                                    alt="mainblogsImg"
                                    className="md:w-1/2 w-full md:h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                                />
                            )}
                            <div className='border h-[300px] md:h-[500px] overflow-y-auto border-gray-500 rounded-xl w-full space-y-3'>
                                <CommentInput name={profile.name} pic={profile.photo.url} id={id} userId={profile._id}/>
                                {
                                 comments && comments.map((comment)=>{
                                    return <Comment name={comment.name} key={comment._id} content={comment.content}/>

                                 })   
                                }
                            </div>
                        </div>
                            <div className=" w-full md:pl-6 ">
                                <p className="text-lg mb-6">{blogs?.about}</p>
                                {/* Add more content here if needed */}
                            </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Details
