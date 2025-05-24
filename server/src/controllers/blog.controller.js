const { blogModel } = require("../models/blog.model");
const { redisClient } = require("../redis/redisClient");

const blogController = {
  getBlogs: async (req, res) => {
    try {
      const catchBlogs = await redisClient.get("blogs");

      if (catchBlogs) {
        return res
          .status(200)
          .send({ message: "form catch", blogs: JSON.parse(catchBlogs) });
      }

      const blogs = await blogModel
        .find()
        .populate("author", ["name", "email"]);

      await redisClient.set("blogs", JSON.stringify(blogs), { EX: 60 });

      return res.status(200).send({ message: "get blogs success", blogs });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  getSingleBlogs: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) {
        return res.status(400).send({ message: "id not found" });
      }
      const catchBlog = await redisClient.get(`blog:${id}`);
      if (catchBlog) {
        return res
          .status(200)
          .send({ message: "blog from catch", blog: JSON.parse(catchBlog) });
      }
      let blog = await blogModel.findById(id);

      await redisClient.set(`blog:${id}`, JSON.stringify(blog), { EX: 60 });
      return res.status(200).send({ message: "singleBlog", blog });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  userBlogs: async (req, res) => {
    const userId = req.user.id;

    try {
      if (!userId) {
        return res.send("pelase login in again");
      }
      let userBlogs = await blogModel.find({ author: userId });
      return res
        .status(200)
        .send({ message: " successfully fetched userBlogs", userBlogs });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  createBlogs: async (req, res) => {
    const author = req.body.author;
   
    if (!author) {
      return res.send({ message: "author not find pleae login again " });
    }
    try {
      const { title, content, tags, category, isPublished } = req.body;

      if (!title || !content || !author) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const coverImage = req.file ? req.file.path : null;

      const newBlog = new blogModel({
        title,
        content,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        category,
        author,
        coverImage,
        isPublished: isPublished !== undefined ? isPublished : true,
        views: 0,
        comments: [],
      });

      await newBlog.save();

      return res
        .status(201)
        .json({ message: "Blog post created", blog: newBlog });
    } catch (err) {
      console.error("Error creating blog:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  patchBlogs: async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
      if (!id && !payload) {
        return res.status(400).send({ message: "id or body not set " });
      }
      let blog = await blogModel.findByIdAndUpdate(id, payload);
      await redisClient.del(`blog:${id}`);
      await redisClient.del("blogs");
      return res.status(200).send({ message: "patched success", blog });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
  deleteBlogs: async (req, res) => {
    let id = req.params.id;
    if (!id) {
      return res.send({ message: "id not found" });
    }
    try {
      const blog = await blogModel.findByIdAndDelete(id);
      await redisClient.del(`blog:${id}`);
      await redisClient.del("blogs");
      return res.status(200).send({ message: "blog deleted success", blog });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
};

module.exports = { blogController };
