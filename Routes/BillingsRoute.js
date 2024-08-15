const express = require("express");
const routes = express.Router();


const { authentication } = require("../Controller/Authentication");
const { createBill, getbill, setSearchDate } = require("../Controller/BillingsController");

routes.post("/billings", authentication, createBill);
routes.get("/billings", authentication, getbill);
routes.post("/billings/searchdate", authentication, setSearchDate);

module.exports = routes;