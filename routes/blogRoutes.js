const express = require("express");
const { getAllBlogs, getBlog } = require("../controllers/blogController.js");
const blogRouter = express.Router();

blogRouter.get('/get-all-blogs', getAllBlogs);
blogRouter.get('/get-blog/:id', getBlog);

module.exports = blogRouter;
