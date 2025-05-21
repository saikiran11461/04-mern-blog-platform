const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    coverImage:{type:String, required:false},
    tags:{type:[String],required:false},
    category:{type:String,required:false},
    author:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,ref: "User",
        },
        text:String,
        createdAt: {
            type: Date,
            default: Date.now,
          },
    }],
    views:{type:Number,default:0},
    isPublished:{type:Boolean,default:true}
},{
    timestamps:true,
    versionKey:false
})

const blogModel = mongoose.model("blog", blogSchema);

module.exports = {blogModel}