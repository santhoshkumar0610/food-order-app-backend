const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ message: "NO token provided" });

    try {
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch {
        res.status(401).json({ message: "Invalid Token" })
    }
}