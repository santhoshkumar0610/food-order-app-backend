const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT into users (name,email,password) VALUES (?,?,?)",
        [name, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).json(err)
            res.json({ message: "user created" });
        }
    )
}

//LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length == 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )
            res.json({ token })
        }
    )
}