import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPass = () => {
    const [email, setEmail] = useState({})
    const [loading, setLaoding] = useState(false);
    console.log(email);
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            setLaoding(true)
            const res = await axios.post(`/api/user/forgotpass`, { email });
            console.log(res.data);
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
        } catch (error) {
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
            setLaoding(false)

        }
    }
    return (
        <div className='h-[80vh] w-full flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-[400px] h-[200px] bg-green-600 rounded-lg '>
                <h1 className='text-center text-2xl font-bold'>Forgot Password</h1>
                <form onSubmit={handelSubmit} className='flex flex-col items-center gap-4 mt-6'>
                    <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' required placeholder='Email...' />
                    <button disabled={loading} type='submit' className='bg-red-600 rounded-lg hover:scale-105 flex items-center gap-1 p-2 font-bold mt-1'>{!loading ? "Submit" : "Loading.."}</button>
                </form>
            </div>

        </div>
    )
}

export default ForgotPass
