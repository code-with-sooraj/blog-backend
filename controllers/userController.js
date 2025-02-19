const User = require("../models/User.js");

const createBlog = async (req, res) => {
    const { title, content, description, image,author  } = req.body;
    const blog = await Blog.create({ title, content, description, image,author });
    res.status(201).json(blog);
}

const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
}

const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    const { title, content, description, image } = req.body;
    blog.title = title;
    blog.content = content;
    blog.description = description;
    blog.image = image;
    await blog.save();
    res.json({ message: "Blog updated successfully", blog });
}   

module.exports = {
    createBlog,
    deleteBlog,
    updateBlog
};
