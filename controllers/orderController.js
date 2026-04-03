const db = require("../config/db")

exports.getOrders = (req, res) => {
    const userId = req.user.id
    db.query("SELECT * FROM orders WHERE user_id=? ORDER  BY id DESC",
        [userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result)
        })
}

exports.createOrders = (req, res) => {
    const { total, items } = req.body

    const userId = req.user.id; // 🔥 from token

    db.query(
        "INSERT INTO orders (total_amount, user_id) VALUES (?,?)",
        [total, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);

            const orderId = result.insertId;

            items.forEach(item => {
                db.query("insert into order_items (order_id, product_id, quantity) values (?,?,?)",
                    [orderId, item.product_id, item.quantity],
                    (err, result) => {
                        if (err) return res.status(500).json(err)
                    }
                )
            })
            res.json({ message: "Order with items created" });
        }
    )
}

exports.updateOrders = (req, res) => {
    const { status } = req.body
    const { id } = req.params
    const userId = req.user.id
    db.query("UPDATE orders SET status=? WHERE id=? and user_id=?",
        [status, id, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(403).json({ message: "Not allowed" })
            }
            res.json({ message: "Order status updated" })
        }
    )
}