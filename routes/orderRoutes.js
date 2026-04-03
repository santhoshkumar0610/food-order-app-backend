const express = require("express");
const route = express.Router();

const { getOrders, createOrders, updateOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware")

route.get("/", authMiddleware, getOrders)

route.post("/", authMiddleware, createOrders)

route.put("/:id", authMiddleware, updateOrders)

module.exports = route