const express = require("express");
const router = express.Router();

const { getProducts, addProducts } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProducts);

module.exports = router