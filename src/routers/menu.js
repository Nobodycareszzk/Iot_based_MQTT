const menuRouter = require("express").Router();

const { getMenuTreeByRoleId } = require("../controllers/menuController");

menuRouter.get("/menu/:id", getMenuTreeByRoleId);

module.exports = menuRouter;
