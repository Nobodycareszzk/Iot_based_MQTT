const menuRouter = require("express").Router();
const { verifyToken } = require("../middleware/loginMiddleware");

const { getMenuTreeByRoleId } = require("../controllers/menuController");

menuRouter.get("/tree", verifyToken, getMenuTreeByRoleId);

module.exports = menuRouter;
