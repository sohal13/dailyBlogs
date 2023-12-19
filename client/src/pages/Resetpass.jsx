import React, { useState } from 'react'
import { updateError, updateState, updateSuccess } from '../store/user/userSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resetpass = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user)

    const [formData, setFormdata] = useState({
    })

    const handelChnage = (e) => {
        setFormdata({ ...formData, [e.target.id]: e.target.value })
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error('Password not Matching', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            dispatch(updateState(true))
            const res = await axios.post(`/api/user/updatepass/${currentUser?._id}`, formData);

            if (res.data.success === false) {
                dispatch(updateError(res.data));
                return;
            }
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(updateSuccess(res.data.rest));
            navigate('/profile')


        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(updateError(error.message))
        }
    }
    return (
        <div className='h-[80vh] w-full flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-[400px] h-[400px] bg-green-600 rounded-lg '>
                <h1 className='text-center text-2xl font-bold'>Reset Password</h1>
                <form onSubmit={handelSubmit} className='flex flex-col items-center gap-4 mt-6'>
                    <input type='text' id='password' onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' placeholder='New Password' />
                    <input type='text' id='confirmPassword' onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' placeholder='Confirm Password' />
                    <button type='submit' className='bg-red-600 rounded-lg hover:scale-105 flex items-center gap-1 p-2 font-bold mt-5'>Reset-Password</button>
                </form>
            </div>

        </div>
    )
}

export default Resetpass
