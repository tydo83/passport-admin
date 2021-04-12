const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
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
    adminCreated: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("admin", adminSchema)