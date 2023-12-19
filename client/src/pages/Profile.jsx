import React from 'react';
import profileimg from '../assets/profileimg.jpg'
import { useSelector } from 'react-redux';
import { IoIosSettings } from "react-icons/io";
import { Link } from 'react-router-dom';

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user)
    return (
        <div>
            <div className=''>
                <h1 className='text-center text-2xl font-bold'>Profile</h1>
                <div className='flex flex-col items-center gap-4 mt-6'>
                    <img className='w-24 h-24 rounded-full' src={currentUser ? currentUser?.image : profileimg} alt='' />
                    <div className='flex flex-col gap-4 text-lg'>
                        <h1 className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md'>{currentUser?.name} </h1>
                        <h1 className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md'>{currentUser?.email}</h1>
                        <h1 className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md'>{currentUser?.phone}</h1>
                    </div>
                    <Link to={'/account'}>
                        <button className='bg-red-600 rounded-lg hover:scale-105 flex items-center gap-1 p-2 font-bold mt-5'>Account Setting<IoIosSettings /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile