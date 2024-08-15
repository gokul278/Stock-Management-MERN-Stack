const express = require("express");
const routes = express.Router();

const { authentication } = require("../Controller/Authentication");
const { getStock, createNewStock, searchStock, removeStock, updateStock } = require("../Controller/StockController");

routes.get("/stocks", authentication, getStock);
routes.post("/stocks", authentication, createNewStock);
routes.post("/stocks/search", authentication, searchStock);
routes.delete("/stocks", authentication, removeStock);
routes.patch("/stocks", authentication, updateStock);

module.exports = routes;
