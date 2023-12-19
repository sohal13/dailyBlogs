import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ForgotResetPass = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormdata] = useState({
    })
    const [loading, setLaoding] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = window.location.pathname.split('/').pop();

        setFormdata({ ...formData, token })
    }, [location.search]);

    const handelChnage = (e) => {
        setFormdata({ ...formData, [e.target.id]: e.target.value })
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.token);
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
            setLaoding(true)
            const res = await axios.post(`/api/user/resetpassword/${formData.token}`, formData);
            if (res.data.success === false) {
                toast.error(res.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setLaoding(false)
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
            setLaoding(false)
            navigate('/signin')

        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(`${error.response.data.message}`);
            setLaoding(false)
            navigate('/forgot-password')
        }
    }
    return (
        <div className='h-[80vh] w-full flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-[400px] h-[400px] bg-green-600 rounded-lg '>
                <h1 className='text-center text-2xl font-bold'>Reset Password</h1>
                <form onSubmit={handelSubmit} className='flex flex-col items-center gap-4 mt-6'>
                    <input type='text' id='password' onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' placeholder='New Password' />
                    <input type='text' id='confirmPassword' onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' placeholder='Confirm Password' />
                    <button disabled={loading} type='submit' className='bg-red-600 rounded-lg hover:scale-105 flex items-center gap-1 p-2 font-bold mt-5'>Reset-Password</button>
                </form>
            </div>

        </div>
    )
}

export default ForgotResetPass;

