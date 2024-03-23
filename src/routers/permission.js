const { getPermissonByRoleId } = require("../controllers/permissionController.js");

const permissionRouter = require("express").Router();

permissionRouter.get("/permission/:id", getPermissonByRoleId);

module.exports = permissionRouter;
