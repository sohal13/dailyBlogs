import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { updateError, updateState, updateSuccess } from '../store/user/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Updateuser = () => {

    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [file, setFile] = useState(undefined);
    const [filePercent, setfilePercent] = useState(0);
    const [fileerror, setFileerror] = useState(false)
    const [formData, setFormData] = useState({})
    const { loading } = useSelector((state) => state.user);


    useEffect(() => {
        if (file) {
            hadelFileUploa(file);
        }
    }, [file])

    const hadelFileUploa = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setfilePercent(Math.round(progress))
            },
            (error) => {
                setFileerror(true)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setFormData({ ...formData, image: downloadURL })
                    })
            }
        )
    }

    const handelChnage = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateState(true))
            const res = await axios.post(`/api/user/update/${currentUser?._id}`, formData);
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
        <div>
            <div className=''>
                <h1 className='text-center text-2xl font-bold'>Profile</h1>
                <div className='flex flex-col items-center gap-4 mt-6'>
                    <form onSubmit={handelSubmit} className='flex flex-col gap-4 text-lg items-center'>


                        <div className='w-24 h-24 rounded-full relative '>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type='file'
                                ref={fileRef}
                                hidden
                                accept='image/*' />

                            <img className='w-24 h-24 self-center rounded-full'
                                onClick={() => fileRef.current.click()}
                                src={formData?.image || currentUser?.image} alt='profile.jpg' />
                            {formData.image ? ("") : (<img
                                onClick={() => fileRef.current.click()}
                                className='absolute top-14 flex justify-center w-[96px] h-10 rounded-b-full bg-gray-500 opacity-50 '
                                src={'https://cdn-icons-png.flaticon.com/512/2956/2956744.png'} alt=''
                            />)}
                        </div>
                        {fileerror ?
                            (<span className='text-red-500 text-sm px-2'>Error Image Upload (size less then 2mb) </span>)
                            :
                            filePercent > 0 && filePercent < 100 ? (
                                <span className='text-green-600 text-sm'>{`Updating ${filePercent}%`}</span>)
                                :
                                filePercent === 100 ?
                                    (
                                        <span className='text-green-600 text-sm'>{`Image Succesfully Uploaded`}</span>)
                                    :
                                    ("")
                        }
                        <input id='name' type='text' defaultValue={currentUser?.name} onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100 rounded-md' />
                        <input id='email' type='email' defaultValue={currentUser?.email} onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' />
                        <input id='phone' type='number' defaultValue={currentUser?.phone} onChange={handelChnage} className='w-auto sm:w-64 p-2 bg-slate-100  rounded-md' />
                        <button disabled={loading} type='submit' className='bg-green-600 rounded-lg hover:scale-105 flex self-center gap-1 p-2 font-bold mt-5'>{loading ? 'Loading..' : 'Update'}</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Updateuser;
