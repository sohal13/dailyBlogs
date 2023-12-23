import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import selectimg from '../assets/selectimg.jpg';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditBlog=()=>{

    const fileref = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user)

    const { id } = useParams();

    const [blog, setBlog] = useState();
    const [file, setFile] = useState(undefined);
    const [filePercent, setfilePercent] = useState(0);
    const [fileerror, setFileerror] = useState(false);
    const [defaultData, setDefaultData] = useState(false);
    const [formData, setFromData] = useState({
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getblogdata = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/blog/thisblog/${id}`);
                const data = await res.data;
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                    return;
                }
                setLoading(false)
                setDefaultData(data);
            } catch (error) {
                setLoading(false);
                console.log(error.response.data);
            }
        }
        getblogdata();
    }, [id])


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
                        setFromData({ ...formData, image: downloadURL })
                    })
            }
        )
    }


    const handelChange = (e) => {
        setFromData({
            ...formData, [e.target.id]: e.target.value
        })
    }
console.log(formData);
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`/api/blog/editblog/${id}`, formData);
            const data = await res.data;
            if (data.success === false) {
                setLoading(false);
                console.log(data.message);
                return;
            }
            setLoading(false);
            navigate('/myblogs')
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return(
<>
<div className='max-w-6xl mx-auto flex justify-center'>
            <div className='mt-5'>
                <h1 className='text-center text-2xl font-bold mb-4'>Create Blog</h1>
                <form onSubmit={handelSubmit} className='flex flex-col justify-center gap-2 w-[250px] sm:w-[400px]'>
                    <input 
                    id='title'
                     type='text' 
                     placeholder='Title..' 
                     onChange={handelChange}
                     defaultValue={defaultData.title}
                     className='p-1 w-full sm:w-[400px] px-2 py-2 rounded-md bg-green-300' 
                     />
                    <textarea 
                    id='description' 
                    rows={5} type='text' 
                    placeholder='Desription..' 
                    onChange={handelChange} 
                    defaultValue={defaultData.description}
                    className='p-1 w-full sm:w-[400px] px-2 py-2 rounded-md bg-green-300' 
                    />
                    <div className='flex flex-col justify-center gap-2'>
                        <h1 className='text-sm'>Select An Image(for Changing)</h1>
                        <div className='flex justify-around'>
                            <input
                                id='image'
                                onChange={(e) => setFile(e.target.files[0])}
                                type='file'
                                ref={fileref}
                                defaultValue={defaultData.image}
                                accept='image/*' />
                            <img  onClick={() => fileref.current.click()} />
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
                        <img src={formData?.image || defaultData?.image} className='w-full h-24 ' />
                    </div>
                    <button type='submit' className='bg-green-500 hover:scale-105 rounded-md py-2 px-2 font-bold mt-5'>Submit</button>
                </form>
            </div>
        </div>
</>
    )
}

export default EditBlog;
