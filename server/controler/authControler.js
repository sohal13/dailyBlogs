import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import JWT from 'jsonwebtoken';

export const signupRoute = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        const userPresent = await User.findOne({ email });
        const phonePresent = await User.findOne({ phone });
        if (userPresent || phonePresent) {
            return res.json({ success: false, message: "User Alredy Exist on This Email or Phone No." }).status(409)
        }
        const hashPassowrd = bcryptjs.hashSync(password, 10)
        const newUser = new User({
            name, email, phone, password: hashPassowrd
        });
        await newUser.save();
        res.status(201).json({ message: "user created succesfully" })
    } catch (error) {
        next(error);
    }
}

export const signinRoute = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Present Please Register!!" }).status(409);
        }
        const comparePass = bcryptjs.compareSync(password, user.password);
        if (!comparePass) {
            return res.json({ success: false, message: "Invalid Password!!!" }).status(401);
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_TOKEN);
        const tenYearsInMilliseconds = 10 * 365 * 24 * 60 * 60 * 1000;
        const { password: pass, ...rest } = user._doc;
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + tenYearsInMilliseconds) })
            .status(200)
            .json({ message: "Login Succesfully!!", rest },)

    } catch (error) {
        next(error)
    }
}
