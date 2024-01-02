import React, { useEffect, useState } from 'react'
import Blogsetting from '../components/Blogsetting'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import blgdmoimg from '../assets/blogdmo.png';
import BlogTime from '../components/BlogTime';


const Home = () => {

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
        <div>
            <div>
                <Blogsetting />
            </div>
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
                                    <div key={blog._id} className="max-w-lg flex flex-col justify-between shadow-gray-600 hover:scale-105 w-[400px] min-h-[400px] sm:w-[300px] bg-green-500 rounded overflow-hidden shadow-lg">
                                        <img className="w-full h-[250px] sm:h-[250px]" src={blog.image} alt="image.png" />
                                        <div className="px-2 py-2">
                                            <div className="font-bold text-xl mb-2">{blog.title}</div>
                                            <p className="text-gray-700 text-base">
                                                {blog.description.split(' ').slice(0,6).join(' ')}...
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

export default Home