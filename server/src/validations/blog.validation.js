// src/validations/blog.validation.js
const { body } = require("express-validator");

const blogValidation = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string"),

  body("content")
    .notEmpty().withMessage("Content is required")
    .isString().withMessage("Content must be a string"),

  body("coverImage")
    .optional()
    .isURL().withMessage("Cover image must be a valid URL"),

  body("tags")
    .optional()
    .isArray().withMessage("Tags must be an array")
    .custom((arr) => arr.every(tag => typeof tag === "string"))
    .withMessage("Each tag must be a string"),

  body("category")
    .optional()
    .isString().withMessage("Category must be a string"),

  body("author")
    .notEmpty().withMessage("Author is required")
    .isMongoId().withMessage("Author must be a valid Mongo ID"),

  body("comments")
    .optional()
    .isArray().withMessage("Comments must be an array"),

  body("comments.*.user")
    .optional()
    .isMongoId().withMessage("Each comment user must be a valid Mongo ID"),

  body("comments.*.text")
    .optional()
    .isString().withMessage("Each comment text must be a string"),

  body("views")
    .optional()
    .isNumeric().withMessage("Views must be a number"),

  body("isPublished")
    .optional()
    .isBoolean().withMessage("isPublished must be a boolean"),
];

module.exports = { blogValidation };
