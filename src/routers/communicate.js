const express = require("express");
const { controlDevcie } = require("../controllers/communicateController");

const communicateRouter = express.Router();

communicateRouter.post("/control", controlDevcie);

module.exports = communicateRouter;
