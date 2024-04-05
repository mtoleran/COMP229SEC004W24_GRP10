import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import config from './../../config/config.js'


const signin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if(!email || !password ){
            return res.status(401).send({ error:"All fields are required" })
        }
        let user = await User.findOne({ "email": email })
        if (!user)
            return res.status(401).json({ error: "Incorrect email or password" })
        if (!user.authenticate(password)) {
            return res.status(401).send({ error: "Incorrect email or password" })
        }
        
        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "Signed out"
    })
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: "auth"
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status("403").json({
            error: "User is not authorized"
        })
    }
    next()
}
export default { signin, signout, requireSignin, hasAuthorization }