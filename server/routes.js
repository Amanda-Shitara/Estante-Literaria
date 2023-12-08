const express = require("express");
const route = express.Router();
const loginController = require("./src/controller/loginController")
const registerController = require("./src/controller/registerController")
const userController = require("./src/controller/userController")
const productsController = require("./src/controller/productsController")

route.post("/login", loginController.loginPost)

route.post("/cadastro", registerController.registerPost);

route.post("/usuario", userController.userPost);

route.put("/usuario", userController.userPut);

route.delete("/usuario", userController.userDelete);

route.get("/produtos/:query?", productsController.productsGet)

module.exports = route;