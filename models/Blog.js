const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },  // You can keep this for a short summary
    content: { type: String, required: true },
    image: {
        type: String,
        default: 'https://vignan.ac.in/vignantest/departments/dep_assets/images/no-image.png'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    approved: { type: Boolean, default: false },
    tags: {
        type: [String],
        default: []
    },
    upvote: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
