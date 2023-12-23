import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import blgdmoimg from '../assets/blogdmo.png';
import { useNavigate } from 'react-router-dom';
import BlogTime from '../components/BlogTime';


const MyBlogs = () => {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [myblog, SetMyBlog] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const myBlogs = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/blog/userblogs/${currentUser._id}`);
                const data = await res.data;
                if (data.success === false) {
                    setLoading(false)
                    console.log(data.message);
                }
                setLoading(false);
                SetMyBlog(data.userBlogs)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        myBlogs();
    }, [])


    return (
        <div>
            <div className='w-full h-full'>
                <h1 className='flex justify-center text-3xl font-bold mt-2'>My Blogs</h1>
                {
                    myblog.length === 0 ? (<>
                        <div className='max-w-6xl  mx-auto  gap-5 flex flex-col justify-center mt-10'>
                            <h1 className='text-center text-3xl'>You Dont have Any Blog</h1>
                            <button onClick={() => navigate('/createblog')} className='px-4 bg-green-600 py-2 font-bold self-center rounded-md hover:scale-105'>CreateBlog</button>
                            <button onClick={() => navigate('/')} className='px-4 bg-green-600 py-2 font-bold self-center rounded-md hover:scale-105'>Home</button>
                        </div>
                    </>) : ("")
                }
                {
                    loading ? (<>
                        <h1 className='flex justify-center text-2xl'>
                            Loading....
                        </h1>
                    </>) :
                        (<>
                            <div className="flex flex-wrap justify-around mt-5 p-3 gap-6 ">
                                {myblog.map((blog) => (
                                    <div key={blog._id} className="max-w-sm shadow-gray-600 hover:scale-105 w-[200px] h-auto sm:w-[300px] sm:h-auto bg-green-500 rounded overflow-hidden shadow-lg">

                                        <img className="w-full h-[150px] sm:h-[250px]" src={blog.image} alt="image.png" />
                                        <div className="px-2 py-2">
                                            <div className="font-bold text-xl mb-2">{blog.title}</div>
                                            <p className="text-gray-700 text-base">
                                                {blog.description.split(' ').slice(0,6).join(' ')}..
                                            </p>
                                        </div>
                                        <BlogTime blog={blog}/>
                                        <button onClick={() => { navigate(`/thisblog/${blog._id}`) }} className='bg-gray-600 hover:bg-green-900 py-2 w-full self-center text-lg font-bold text-white'>Read Blog</button>
                                    </div>
                                ))}
                            </div>
                        </>)
                }
            </div >
        </div>
    )
}

export default MyBlogs
