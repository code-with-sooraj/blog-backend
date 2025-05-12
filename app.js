const express =  require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const _dirname = path.dirname('');
const buildPath = path.join(_dirname, '../blgo-frontend/build');

const app = express();
app.use(express.json());
app.use(express.static(buildPath));
const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = isProd
  ? ['https://localhost:5173']
  : ['http://localhost:5173', 'http://192.168.0.108:5173'];

app.use('/*',cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // required to send cookies
}));
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog",blogRoutes);

module.exports =  app;
