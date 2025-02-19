const express =  require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/*',cors());
app.use("/api/v1/auth", authRoutes);
app.route("api/v1/blog",blogRoutes);

module.exports =  app;
