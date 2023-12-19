import JWT from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    JWT.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is not Valid" })
        req.user = user;
        next();
    });
};