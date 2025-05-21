const {blogModel} = require("../models/blog.model");
const {redisClient} = require("../redis/redisClient")

const blogController = {
    getBlogs:async(req,res)=>{
        
        try {

            const catchBlogs = await redisClient.get("blogs")

            if(catchBlogs){
                return res.status(200).send({message:"form catch", blogs:JSON.parse(catchBlogs)})
            }

            const blogs =  await blogModel.find().populate("author",["name","email"]);

            await redisClient.set("blogs", JSON.stringify(blogs),{EX:60})

            return res.status(200).send({message:"get blogs success", blogs})
        } catch (error) {
            return res.status(500).send({message:error})
        }
    },

    getSingleBlogs:async(req,res)=>{
        const id = req.params.id
       
        try {
            if(!id){
                return res.status(400).send({message:"id not found"})
            }
            const catchBlog = await redisClient.get(`blog:${id}`);
            if(catchBlog){
                return res.status(200).send({message:"blog from catch", blog:JSON.parse(catchBlog)})
            }
            let blog  = await blogModel.findById(id);

            await redisClient.set(`blog:${id}`,JSON.stringify(blog),{ EX: 60 })
            return res.status(200).send({message:"singleBlog", blog})
        } catch (error) {
            return res.status(500).send({message:error})
        }
    },

    creteBlogs:async(req,res)=>{
        const payload = req.body
     
        try {
            if(!payload){
                return res.status({message:"body not set"})
            }
            let blog  = await blogModel.create(payload);
            return res.status(200).send({message:"blog created Success", blog})
        } catch (error) {
            return res.status(500).send({message:error})
        }
    },

    patchBlogs:async(req,res)=>{
         const id = req.params.id
         const payload = req.body
        try {
            if(!id && !payload){
                return res.status(400).send({message:"id or body not set "})
            }
            let blog = await blogModel.findByIdAndUpdate(id,payload);
            return res.status(200).send({message:'patched success',blog})
        } catch (error) {
            return res.status(500).send({message:error})
        }
    },
    deleteBlogs:async(req,res)=>{
        let id = req.params.id;
        if(!id){
            return res.send({message:"id not found"})
        }
        try {

            await redisClient.del(`blog:${id}`);
            const blog  = await blogModel.findByIdAndDelete(id);
            return res.status(200).send({message:"blog deleted success", blog})
        } catch (error) {
            return res.status(500).send({message:error})
        }
    }
}


module.exports = {blogController}