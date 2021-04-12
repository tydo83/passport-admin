const Admin = require('../model/Admin')
const User = require('../../users/model/User')

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
    try {
        let genSalt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(req.body.password, genSalt);

        let createdAdmin = new Admin({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        })

        let savedCreatedAdmin = await createdAdmin.save();

        res.json({
            message: "User created",
            user: savedCreatedAdmin,
        })

    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const login = async (req, res) => {
    try {
        let foundAdmin = await Admin.findOne({ email: req.body.email })
        
        if(!foundAdmin) {
            throw { message: "User not found! please go sign up!"}
        }

        let comparedPassword = await bcrypt.compare(
            req.body.password,
            foundAdmin.password
            );

        if(!comparedPassword) {
            throw { message: "Please check your email and password"}
        }

        let jwtToken = jwt.sign({ 
            email: foundAdmin.email,
            username: foundAdmin.username,
        },
        process.env.JWT_SECRET_STRING2,
        {
            expiresIn: "1d",
        })
        res.json({
            jwtToken,
        })
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const updateProfile = async(req, res) => {
    try {
        res.json({
            user: req.user,
            message: "Update route success",
            // session: req.session.passport,
        })
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const getAllUsersProfile = async (req, res) => {
    try {
        let allUsersProfile = await User.find({})
        res.json({
            message: "Got all users",
            users: allUsersProfile
        })
    } catch(e) {
        res.status(e).json({ message: e.message })
    }
}

const createUser = async ( req, res ) => {
    try {
        let genSalt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(req.body.password, genSalt);

        let createdUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        })

        let savedCreatedUser = await createdUser.save();

        res.json({
            message: "Admin created new user",
            user: savedCreatedUser,
        })

    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        let deletedUser = await User.findOneAndDelete({
            email: req.body.email
        })
        res.json({
            message: "Admin deleted below user",
            user: deletedUser
        })
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let updatedUser = await User.findOneAndUpdate(
            {email: req.body.email},
            req.body,
            {new: true}
        )
        res.json({
            user: updatedUser,
            message: "Update route success",
            // session: req.session.passport,
        })
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { 
    signUp, 
    login,
    updateProfile,
    getAllUsersProfile,
    createUser, deleteUser, updateUser,
};