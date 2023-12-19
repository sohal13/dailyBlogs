import axios from 'axios';
import React, { useEffect, useState } from 'react';
import blgdmoimg from '../assets/blogdmo.png';
import { useNavigate } from 'react-router-dom'

const Allblogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/blog/allblogs');
                const data = await res.data;
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                    return;
                }
                setBlogs(data.blogs);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllBlogs();
    }, [])

    return (
        <div className='w-full h-full'>
            <h1 className='flex justify-center text-3xl font-bold mt-2'>Blogs</h1>
            {
                loading ? (<>
                    <h1 className='flex justify-center text-2xl'>
                        Loading....
                    </h1>
                </>) :
                    (<>
                        <div className="flex flex-wrap justify-around mt-5 p-3 gap-6 ">
                            {blogs.map((blog) => (
                                <div key={blog._id} className="max-w-sm shadow-gray-600 hover:scale-105 w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] bg-green-500 rounded overflow-hidden shadow-lg">
                                    <img className="w-full h-[150px] sm:h-[250px]" src={blgdmoimg} alt="image.png" />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{blog.title}</div>
                                        <p className="text-gray-700 text-base">
                                            {blog.description}
                                        </p>
                                    </div>
                                    <button onClick={() => { navigate(`/thisblog/${blog._id}`) }} className='bg-gray-600 hover:bg-green-900 py-2 w-full self-center text-lg font-bold text-white'>Read Blog</button>
                                </div>
                            ))}
                        </div>
                    </>)
            }
        </div >
    )
}

export default Allblogs;