const productRouter = require("express").Router();
const { getProductListInfo } = require("../controllers/productController");

productRouter.get("/query/list", getProductListInfo);
module.exports = productRouter;
