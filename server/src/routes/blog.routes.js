const express = require("express");
const {blogController} = require("../controllers/blog.controller");
const { authentication } = require("../middlewares/authentication");
const { blogValidation } = require("../validations/blog.validation");
const { validateRequest } = require("../middlewares/validatorRequest");
const { attachAuthenticator } = require("../middlewares/attachAuthencator");
const {parser} = require("../middlewares/FileUploads")
const blogRouter = express.Router();


blogRouter.get("/", blogController.getBlogs);
blogRouter.get("/userblogs",authentication, blogController.userBlogs)
blogRouter.get("/:id", blogController.getSingleBlogs)
blogRouter.post("/add", authentication,validateRequest, parser.single("coverImage"),attachAuthenticator, blogValidation, blogController.createBlogs)
blogRouter.patch("/:id", blogController.patchBlogs)
blogRouter.delete("/:id",blogController.deleteBlogs)


module.exports = {blogRouter}