import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "This username is already taken!"],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Please have at least 8 characters!"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    level: {
        type: Number,
        default: 0,
    },
    lastSolved: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
