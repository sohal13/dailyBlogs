import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate ,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { currentUser } = useSelector(state => state.user)
    const [searchTerm, SetSearch] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermUrl = urlParams.get('searchTerm');
        if(searchTermUrl){
            SetSearch(searchTermUrl)
        }
    },[location.search])

    return (
        <header className='bg-green-700 shadow-md'>
            <div className='flex justify-between items-center h-[70px] max-w-6xl mx-auto p-1 sm:p-3'>
                <Link to={'/'}> <h1 className='text-3xl md:text-3xl font-bold font-sans text-yellow-500 flex flex-wrap'>Daily
                    <span className='text-white'>Blogs</span>
                </h1></Link>
                <form onSubmit={handelSubmit} className='flex bg-white items-center rounded-lg p-1 min-w-[150px] h-14'>
                    <input type='text' placeholder='Search....'
                        onChange={(e) => SetSearch(e.target.value)}
                        required
                        className='bg-transparent focus:outline-none w-32 sm:w-64' />
                    <button type='submit'>
                        <FaSearch size={30} className='cursor-pointer hover:bg-yellow-500 rounded-lg p-1 items-end' />
                    </button>
                </form>
            <ul className='flex sm:w-64 items-center justify-around text-2xl font-bold text-white'>
                    <Link to={'/'}><li className='hover:bg-green-900 px-1 rounded-lg cursor-pointer hidden sm:inline'>
                        Home</li></Link>
                    <Link to={'/allblogs'}><li className='hover:bg-green-900 px-1 rounded-lg cursor-pointer hidden sm:inline'>
                        AllBlog</li></Link>
                    {
                        currentUser ? (<Link to={'/profile'}><img src={currentUser?.image} alt='avtar.jpg' className='rounded-full h-14 w-14 cursor-pointer hover:scale-105' />
                        </Link>) : (<Link to={'/signin'}><li className='bg-yellow-500 text-green-900 px-2 rounded-lg cursor-pointer hover:scale-105'>LogIn</li></Link>)
                    }
                </ul>
            </div>
        </header>
    )
}

export default Header
