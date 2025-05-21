const {userModel} = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const userController = {
    getUser:async(req,res)=>{
       
        try {
            let user = await userModel.find();
            return res.status(200).send({message:"users fetched success", user})
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    register:async(req,res)=>{
          const {name,email,password} = req.body
        try {
            let user = await userModel.findOne({email});
            if(user){
                return res.status(201).send("user already exist")
            }
            let hashedPassword =await bcrypt.hash(password, 10);

            let new_user = await userModel({
                name:name,
                email:email,
                password:hashedPassword
            })
            await new_user.save();
            return  res.status(200).send({message:"user created success", new_user})
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    login:async(req,res)=>{
        const {email,password} = req.body
        try {
            let user = await userModel.findOne({email});
            if(!user){
                return res.status(400).send({message:"user not found"})
            }
            const  comparePass = await bcrypt.compare(password, user.password);
            if(!comparePass){
                return res.status(400).send({message:"please check your email or password"})
            }
            const  token = jwt.sign({email:user.email, id:user._id},process.env.JWT_TOKEN);
            
            if(token){
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "Lax",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                  });
            }
          

            return res.status(200).send({message:"user logged in success", })
        } catch (error) {
            return res.status(500).send({message:error})
        }
    },

   
 logOut:async(req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
  
    return res.status(200).send({ message: "Logout successful" });
  }
  
}


module.exports = {userController}