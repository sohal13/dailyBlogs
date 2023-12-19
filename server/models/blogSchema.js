import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;