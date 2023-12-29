import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import BlogTime from '../components/BlogTime';

const SingleBlog = () => {

    const navigate = useNavigate();

    const { currentUser } = useSelector(state => state.user)
    const { id } = useParams();

    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getblogdata = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/blog/thisblog/${id}`);
                const data = await res.data;
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                    return;
                }
                setLoading(false)
                setBlog(data);
            } catch (error) {
                setLoading(false);
                console.log(error.response.data);
            }
        }
        getblogdata();
    }, [id])

    const creater = blog?.userId || {};

    const handelDelete = async (blog) => {
        try {
            const confirmation = window.confirm("Do You want to Delete your Blog ?");
            if (!confirmation) {
                return;
            }
            const res = await axios.delete(`/api/blog/deleteblog/${blog._id}`);
            const data = await res.data;
            if (data.success === false) {
                console.log(data.message);
            }
            navigate('/myblogs')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[90%] mx-auto flex flex-col'>
            {loading ? (<>
                <h1 className='text-2xl font-bold flex justify-center mt-4'>LOADING...</h1></>) :
                (<>
                    <div className="rounded overflow-hidden shadow-lg mt-5 bg-green-100">
                        {currentUser._id !== creater._id ? (
                            <div className='flex justify-between items-center px-2 bg-gray-500 py-2'>
                                <div className='flex gap-2'>
                                    <img src={creater.image} className='rounded-full h-8 w-8' alt='user.img' />
                                    <h1 className='text-white font-bold text-xl'>{creater.name}</h1>
                                </div>
                                <button className='bg-green-500 px-2 py-1 rounded-md'>Connect</button>
                            </div>) : (<>

                            </>)}
                        {currentUser._id === creater._id ? (
                            <div className='flex justify-between bg-green-200'>
                                <Link to={`/editblog/${blog._id}`}><button className='bg-green-500 px-4 py-1 hover:scale-105'>Edit</button></Link>
                                <button onClick={() => handelDelete(blog)} className='bg-red-500 px-4 py-1 hover:scale-105'>Delete</button>
                            </div>) : ("")}
                        <img className="w-screen h-[300px]" src={blog?.image} alt="image.png" />
                        <BlogTime blog={blog}/>
                        <div className="px-2 py-2 ">
                            <div className="font-bold text-xl mb-2">{blog?.title}</div>
                            <p className="text-gray-700 text-base">
                                {blog?.description}
                                {blog?.description}

                            </p>
                        </div>

                    </div>
                </>)}
            <button onClick={() => navigate('/allblogs')} className='hover:scale-105 px-6 py-1 bg-green-500 font-bold text-lg rounded-md self-center mt-5'>Back</button>
        </div>
    )
}
export default SingleBlog;