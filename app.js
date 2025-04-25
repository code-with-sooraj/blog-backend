const express =  require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/*',cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true // required to send cookies
}));
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.route("api/v1/blog",blogRoutes);

module.exports =  app;
