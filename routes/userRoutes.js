const express = require("express");
const userRouter = express.Router();

userRouter.get('/create-blog', createBlog);
userRouter.get('/delete-blog/:id', deleteBlog);
userRouter.get('/update-blog/:id',  updateBlog);
