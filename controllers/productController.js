const db = require("../config/db");

// GET PRODUCTS
exports.getProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.addProducts = (req, res) => {
    const { name, price } = req.body;

    db.query(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [name, price],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product added" });
        }
    );
}