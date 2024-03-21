const express = require("express");
const { controlDevcie } = require("../controllers/communicateController_1");

const communicateRouter = express.Router();

communicateRouter.post("/control", controlDevcie);

module.exports = communicateRouter;
