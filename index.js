const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"))
app.use("/products", require("./routes/productRoutes"))
app.use("/orders", require("./routes/orderRoutes"))

// Test route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});