const connection = require("../utils/databaseConnect");

async function getProductList() {
  try {
    const [productList] = await connection.execute("SELECT * FROM product");
    return productList;
  } catch (error) {
    throw error;
  }
}

module.exports = { getProductList };
