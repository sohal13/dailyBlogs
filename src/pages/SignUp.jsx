import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

    const navigate = useNavigate();
    const [inputData, setInputData] = useState({});
    const [loading, setLaoding] = useState(false)

    const handelChnage = (e) => {
        setInputData({
            ...inputData, [e.target.id]: e.target.value,
        })

    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLaoding(true)
        try {
            if (inputData.password !== inputData.cpassword) {
                toast.error('password not matching!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            const res = await axios.post(`/api/auth/signup`, inputData);
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
                setLaoding(false);
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
            setLaoding(false);
            setInputData(res.data)
            navigate('/signin')

        } catch (error) {
            toast.success(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLaoding(false);
        }

    }

    return (
        <div className='max-w-6xl mx-auto flex justify-center items-center h-[90vh]'>
            <div className='flex flex-col bg-green-700 gap-4 w-72 h-auto rounded-lg py-4'>
                <h1 className='text-center text-4xl font-bold text-yellow-400 '>Len<span className='text-white'>Den</span></h1>
                <form onSubmit={handelSubmit} className='flex flex-col gap-4 px-4 text-black'>
                    <input type='text' placeholder='Name...'
                        className='rounded-lg p-1'

                        onChange={handelChnage}
                        id="name"
                        required />
                    <input type='email' placeholder='Email...'
                        className='rounded-lg p-1'
                        onChange={handelChnage}
                        id="email"
                        required />
                    <input type='number' placeholder='Phone...'
                        className='rounded-lg p-1'

                        onChange={handelChnage}
                        id="phone"
                        required />
                    <input type='text' placeholder='Password...'
                        className='rounded-lg p-1'
                        id="password"
                        onChange={handelChnage}
                        required />
                    <input type='text' placeholder='conf. Password...'
                        className='rounded-lg p-1'
                        onChange={handelChnage}
                        id="cpassword"
                        required />
                    <button disabled={loading} type='submit' className='bg-yellow-400
                     text-green-900
                     font-bold
                     rounded-lg
                     w-auto
                     px-4
                     p-1
                     self-center
                     hover:scale-105 '>{loading ? 'Loading...' : 'Register'}</button>
                    <p className='text-md font-medium'>Have an account ?
                        <Link to={'/signin'}>
                            <span className='text-yellow-500 font-bold cursor-pointer hover:underline'>LogIn</span>
                        </Link>
                    </p>
                </form>

            </div>
            <ToastContainer />
        </div>
    )
}
export default SignUp
