import mongoose from "mongoose";
import Blog from "../models/blogSchema.js";
import User from "../models/usermodel.js";

export const getAllblogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        if (!blogs) {
            return res.status(403).send({ success: false, message: "No Blog Founded" })
        }
        res.status(200).send({ blogs, blogsCount: blogs.length })
    } catch (error) {
        next(error)
    }
}

export const getSingleblog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('userId');
        if (!blog) {
            return res.status(404).send({ success: false, message: "No Blog Founded" })
        }
        const sanitizedBlog = {
            _id: blog._id,
            title: blog.title,
            description: blog.description,
            image: blog.image,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            __v: blog.__v,
            userId: blog.userId && {
                _id: blog.userId._id,
                name: blog.userId.name,
                email: blog.userId.email,
                phone: blog.userId.phone,
                image: blog.userId.image,
                createdAt: blog.userId.createdAt,
                updatedAt: blog.userId.updatedAt,
                __v: blog.userId.__v,
                blogs: blog.userId.blogs,
            },
        };
        res.status(200).send(sanitizedBlog)
    } catch (error) {
        next(error)
    }
}

export const createBlog = async (req, res, next) => {
    try {
        const { title, description, image, userId } = req.body;

        if (!title || !description || !image || !userId) {
            return res.status(401).send({ message: "please provide all fields", success: true })
        }

        const existUser = await User.findById(userId)

        if (!existUser) {
            return res.status(404).send({ message: "unable to find User" })
        }
        const newBlog = new Blog({ title, description, image, userId: existUser._id });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existUser.blogs.push(newBlog)
        await existUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        session.endSession();
        return res.status(200).send({ newBlog, message: "Blog Created Succesfully" })
    } catch (error) {
        next(error)

    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
            }
        }, { new: true });
        return res.status(200).send({ blog, message: "Blog Updated Succesfully" })
    } catch (error) {
        next(error)
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id).populate('userId');
        if (!blog) {
            return res.status(404).send({ message: "Blog not found", success: false });
        }
        const user = blog.userId;
        user.blogs.pull(blog);
        await user.save();
        res.status(200).send({ message: "Blog Deleted Succesfully" })
    } catch (error) {
        next(error)
    }
}

export const userBlogs = async (req, res, next) => {
    try {

        const userBlog = await User.findById(req.params.id).populate('blogs');
        if (!userBlog) {
            return res.status(404).send({ message: "Blog not found with this user", success: false });
        }
        const userBlogs = userBlog.blogs;
        return res.status(200).send({
            message: "user blogs",
            userBlogs,
        })
    } catch (error) {
        next(error)
    }
}


export const getBlogs =async(req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';
        const listing = await Blog.find({
            title:{$regex:searchTerm , $options:'i'},
            description:{$regex:searchTerm , $options:'i'}
        }).limit(limit).skip(startIndex);

        return res.status(200).send(listing);

    } catch (error) {
        next(error)
    }
}