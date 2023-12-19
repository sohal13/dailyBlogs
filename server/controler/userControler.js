import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import JWT from 'jsonwebtoken'
import Token from "../models/tokenmodel.js";
import nodemailer from 'nodemailer'
import Blog from "../models/blogSchema.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "you are not authanticated", success: false });
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: req.body.image,
            }
        }, { new: true });
        const { password: pass, ...rest } = updateUser._doc;
        res.status(200).json({ message: "Succesfully Updated", rest });
    } catch (error) {
        next(error)
    }
}
export const updateUserPassword = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "you are not authanticated", success: false });
    }
    try {
        const hashPassowrd = bcryptjs.hashSync(req.body.password, 10)
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                image: req.body.image,
                password: hashPassowrd,
            }
        }, { new: true });
        const { password: pass, ...rest } = updateUser._doc;
        res.status(200).json({ message: "Succesfully Updated", rest });
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(401).json({ message: "you are not authanticated", success: false })
        }
        const deletedUser = await User.findOneAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User Deleted Succesfully" }).clearCookie('token');
    } catch (error) {
        next(error)
    }
}

export const logOut = (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(401).json({ message: "you are not authanticated", success: false })
        }
        res.clearCookie('token');
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        next(error)
    }
}

export const forgotpass = async (req, res, next) => {
    try {
        const email = req.body.email;
        console.log(email);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User Not Found to rest the Email", success: false })
        }
        const payload = {
            email: user.email
        }
        const expiryTime = 300;
        const token = JWT.sign(payload, process.env.JWT_TOKEN, { expiresIn: expiryTime });
        const newToken = new Token({
            userId: user._id,
            token: token
        });
        const mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "sokil3456@gmail.com",
                pass: "clfvljrvaliwhlzr"
            }
        });
        let mailDetail = {
            from: "sokil3456@gmail.com",
            to: email,
            subject: "Reset Passsword",
            html: `
            <html>
            <head>
            <title>Password Reset Request</title>
            </head>
            <body>
            <h1>Reset Password Request</h1>
            <p>Dear ${user.name}</p>
            <p>
              We received a request to reset your password. If you initiated this request, please click the link below to reset your password.
            </p>
            <p>
             <a href=${process.env.LIVE_URL}/reset/${token}>Reset Password</a>
             </p>
            <p>
             If you did not request a password reset, you can ignore this email, and your password will remain unchanged.
              </p>
              <p>Thank you</p>
            </body>
            </html>`
        };
        mailTransport.sendMail(mailDetail, async (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Somthing went wrong while sending email", success: false })
            } else {
                await newToken.save();
                return res.status(200).json({ message: "Email sended Succesfully" })
            }
        })
    } catch (error) {
        next(error)
    }
}

export const resetPass = async (req, res, next) => {
    const { token, password } = req.body;
    console.log(token);
    console.log(password);
    JWT.verify(token, process.env.JWT_TOKEN, async (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Reset Link Expired generate Link Again" })
        } else {
            const responce = data;
            const user = await User.findOne({ email: responce.email });
            const hashPassowrd = bcryptjs.hashSync(req.body.password, 10);
            user.password = hashPassowrd
            try {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: user._id },
                    { $set: user },
                    { new: true }
                )
                return res.status(200).json("Password Reset Succesfully")
            } catch (error) {
                next(error)
            }


        }
    })
}