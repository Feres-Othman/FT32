const router = require("express").Router();
let User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res, next) => {

    try {
        console.log(req.body);
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist)
            return res.json({
                success: false,
                message: "mail-exist"
            })

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        const userName = req.body.username;
        const email = req.body.email;
        const cin = req.body.cin;
        const password = hashedPassword;
        // const birthday = Date.parse(req.body.birthday);

        const newUser = new User({ firstName, lastName, userName, email, password, cin });

        newUser
            .save()
            .then(() => res.json({
                success: true,
                newUser: newUser._id
            }))
            .catch((err) => {
                console.log(err)
                res.json({
                    success: false,
                    message: "mongoose-error"
                })
            });
    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }
}


const login = async (req, res, next) => {

    try {

        console.log(req.body.email)

        const user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.email }] });

        console.log(user)

        if (!user) return res.json({
            success: false,
            message: "user-not-found"
        })

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) return res.json({
            success: false,
            message: "wrong-password"
        })

        else {
            //create and assign a jwt
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 2400 * 60 * 60 });
            console.log(token);
            res.json({
                success: true,
                token,
                user
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }

}

const profile = async (req, res, next) => {

    try {
        const id = req.user._id;
        const user = await User.findOne({ _id: id });


        if (!user) return res.json({
            success: false,
            message: "user-not-found"
        })

        return res.json({
            success: true,
            user: user
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }

}


module.exports = {
    register,
    login,
    profile,
}