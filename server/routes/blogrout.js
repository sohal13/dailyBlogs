import express from 'express';
import { createBlog, deleteBlog, getAllblogs, getSingleblog, updateBlog, userBlogs } from '../controler/blogControler.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/allblogs', getAllblogs);

router.get('/thisblog/:id', getSingleblog);

router.post('/createblog', verifyToken, createBlog);

router.post('/editblog/:id', verifyToken, updateBlog);

router.delete('/deleteblog/:id', verifyToken, deleteBlog);

router.get('/userblogs/:id', verifyToken, userBlogs);








export default router;