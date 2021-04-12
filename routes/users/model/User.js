const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userCreated: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("user", userSchema)