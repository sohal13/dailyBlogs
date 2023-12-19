import React from 'react'
import { MdOutlineUpdate } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { deleteError, deleteState, deleteSuccess } from '../store/user/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AccountSetting = () => {

    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        try {
            const confirmUser = window.confirm("Are You Sure ? Want to DELETE your Account!!")
            if (!confirmUser) {
                return;
            }
            dispatch(deleteState(true));
            const res = await axios.delete(`/api/user/delete/${currentUser?._id}`)
            if (res.data.success === false) {
                dispatch(deleteError(res.data.message))
                return;
            }
            dispatch(deleteSuccess(res.data));
            navigate('/signup')
        } catch (error) {
            console.log(error);
            dispatch(deleteError(error.response.data.message))
        }
    }

    const logouthandler = async () => {
        try {
            const confirmUser = window.confirm("Are You Sure ? Want to LogOut!!")
            if (!confirmUser) {
                return;
            }
            dispatch(deleteState(true));
            const res = await axios.post(`/api/user/logout/${currentUser?._id}`)
            if (res.data.success === false) {
                dispatch(deleteError(res.data.message))
                return;
            }
            dispatch(deleteSuccess(res.data));
            navigate('/signin')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className=''>
                <h1 className='text-center text-2xl font-bold'>Account Setting</h1>
                <div className='flex gap-4 flex-col items-center mt-10'>
                    <div className='w-64 flex flex-col gap-4'>
                        <Link to={'/account/updateuser'}><button className='bg-green-600 w-full p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>Update Profile <MdOutlineUpdate size={23} /></button></Link>
                        <Link to={'/account/resetpassword'}><button className='bg-green-600 w-full  p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>Reset Password<TbPasswordFingerprint size={23} /></button></Link>
                        <Link to={'/profile'} ><button className='bg-green-600 w-full p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>Profile<CgProfile size={23} /></button></Link>
                        <Link to={'/about'} ><button className='bg-green-600 w-full p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>About<FcAbout size={23} /></button></Link>
                        <Link to={'/'} ><button className='bg-green-600 w-full p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>Home<FaHome size={23} /></button></Link>
                        <Link to={'/allblogs'} ><button className='bg-green-600 w-full p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>AllBlogs<FaHome size={23} /></button></Link>
                        <button onClick={logouthandler} className='bg-red-600 w-full  p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>Log-Out<TbLogout size={23} /></button>
                        <button onClick={deleteHandler} className='bg-red-600 w-full  p-2 text-lg font-bold hover:scale-105 rounded-lg flex items-center gap-1'>Delete Account <MdDelete size={23} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSetting
