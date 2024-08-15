const express = require("express");
const routes = express.Router();

const { authentication } = require("../Controller/Authentication.js");
const { check, login, createLogin } = require("../Controller/LoginController.js");

routes.get('/check', authentication, check);
routes.post('/login', login);
routes.post('/login/createaccount', createLogin);

module.exports = routes;