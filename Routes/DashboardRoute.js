const express = require("express");
const routes = express.Router();

const { authentication } = require("../Controller/Authentication");
const { getDashboard } = require("../Controller/DashboardController");

routes.post("/dashboard", authentication, getDashboard);

module.exports = routes;