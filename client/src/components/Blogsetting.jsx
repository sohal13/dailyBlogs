import React from 'react'
import { useNavigate } from 'react-router-dom';

const Blogsetting = () => {

    const navigate = useNavigate();

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex justify-between mt-1 px-2'>
                <button onClick={() => navigate('/createblog')} className='px-2 bg-green-600 py-1 font-bold rounded-md hover:scale-105'>CreateBlog</button>
                <button onClick={() => navigate('/myblogs')} className='px-2 bg-green-600 py-1 font-bold rounded-md hover:scale-105'>MyBlogs</button>
            </div>
        </div>
    )
}

export default Blogsetting
