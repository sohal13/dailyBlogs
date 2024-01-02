import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { signInState, signInSuccess, signInError } from '../store/user/userSlice'


const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputData, setInputData] = useState({});
    const { loading } = useSelector((state) => state.user)

    const handelChnage = (e) => {
        setInputData({
            ...inputData, [e.target.id]: e.target.value,
        })

    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInState(true));
            const res = await axios.post(`/api/auth/signin`, inputData);
            if (res.data.success === false) {
                toast.error(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                dispatch(signInError(res.data));
                return;
            }
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(signInSuccess(res.data.rest))
            navigate('/')
        } catch (error) {
            dispatch(signInError(error.response.data))
        }

    }

    return (
        <div className='max-w-6xl mx-auto flex justify-center items-center h-[90vh]'>
            <div className='flex flex-col bg-green-700 gap-4 w-72 h-auto rounded-lg py-4'>
                <h1 className='text-center text-4xl font-bold text-yellow-400 '>Daily<span className='text-white'>Blogs</span></h1>
                <form onSubmit={handelSubmit} className='flex flex-col gap-4 px-4 text-black'>
                    <input type='email' placeholder='Email...'
                        className='rounded-lg p-1'
                        onChange={handelChnage}
                        id="email"
                        required />
                    <input type='text' placeholder='Password...'
                        className='rounded-lg p-1'
                        id="password"
                        onChange={handelChnage}
                        required />
                    <button disabled={loading} type='submit' className='bg-yellow-400
                     text-green-900
                     font-bold
                     rounded-lg
                     w-auto
                     px-4
                     p-1
                     self-center
                     hover:scale-105 '>{loading ? 'Loading...' : 'LogIn'}</button>
                    <h1 className='text-sm font-medium'>Don't Have an account ?
                        <Link to={'/signup'}>
                            <span className='text-yellow-500 font-bold cursor-pointer underline'>Register</span>
                        </Link>
                        <p className='text-sm font-medium'>forgot password ?
                            <Link to={'/forgot-password'}>
                                <span className='text-blue-900 font-bold cursor-pointer underline'>
                                    Click here </span>
                            </Link>
                        </p>
                    </h1>

                </form>

            </div>
            <ToastContainer />
        </div>
    )
}
export default SignIn

