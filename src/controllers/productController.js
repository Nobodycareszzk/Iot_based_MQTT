const { getProductList } = require("../service/productService");
const createResbody = require("../utils/resBody");

async function getProductListInfo(req, res, next) {
  try {
    const productListResult = await getProductList();
    const data = { products: productListResult, total: productListResult.length };
    res.json(createResbody(2000, "获取成功", data));
  } catch (error) {
    res.json(createResbody(-2002, "获取失败", error.message));
  }
}

module.exports = { getProductListInfo };
