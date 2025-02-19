const Blog = require("../models/Blog.js");

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({ approved: true }).populate("author", "name");
    res.json(blogs);
};

const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
};



module.exports = {
    getBlog,
    getAllBlogs
};
