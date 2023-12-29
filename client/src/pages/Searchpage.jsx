import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate, useLocation } from 'react-router-dom';
import BlogTime from "../components/BlogTime";

const SearchPage =()=>{

    const location = useLocation();
    const navigate = useNavigate();
    const[searchData , setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);

useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get('searchTerm');
    if(searchTermUrl){
        setSearchData(searchTermUrl)
    }
    const fetchData = async()=>{
        try {
            setLoading(true);
            const searchQuery= urlParams.toString();
            const res = await axios.get(`/api/blog/get?${searchQuery}`)
            const data = await res.data;
            setSearchData(data)
            setLoading(false);           
        } catch (error) {
            setLoading(false)
            console.log(error.message);
        }
    }
    fetchData();
},[location.search])

return(
    <>
    <div className="max-w-6xl mx-auto flex flex-col">
        <h1 className="text-2xl font-bold p-3">Search Reasult:</h1>
        <div className="">
        {
                loading ? (<>
                    <h1 className='flex justify-center text-2xl'>
                        Loading....
                    </h1>
                </>) :
                    (<>
                        <div className="flex flex-wrap justify-around mt-2 p-3 gap-6 ">
                            {searchData.map((blog) => (
                                <div key={blog._id} className="max-w-lg shadow-gray-600 hover:scale-105 w-[400px] h-auto sm:w-[300px] bg-green-500 rounded overflow-hidden shadow-lg">
                                    <img className="w-full h-[150px] sm:h-[250px]" src={blog.image} alt="image.png" />
                                    <div className="px-2 py-2">
                                        <div className="font-bold text-xl mb-2 ">{blog.title}</div>
                                        <p className="text-gray-700 text-base">
                                        {blog.description.split(' ').slice(0,5).join(' ')}...
                                        </p>
                                    </div>
                                    <BlogTime blog={blog}/>
                                    <button onClick={() => { navigate(`/thisblog/${blog._id}`) }} className='bg-gray-600 hover:bg-green-900 py-2 w-full self-center text-lg font-bold text-white'>Read Blog</button>
                                </div>
                            ))}
                        </div>
                        
                    </>)
            }
        </div>
    </div>
    </>
)
}
export default SearchPage;