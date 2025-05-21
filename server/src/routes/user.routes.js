const express = require("express");

const userRouter = express.Router();

const {userController} = require("../controllers/user.controller");
const { authentication } = require("../middlewares/authentication");


userRouter.get("/",authentication,  userController.getUser)
userRouter.get("/logout", userController.logOut)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)

module.exports = {userRouter}