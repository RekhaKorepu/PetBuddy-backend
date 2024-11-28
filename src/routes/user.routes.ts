import express from "express";
import User from "../models/user";
const userRouter= express.Router();
userRouter.post('/users/createNewUser', async(req,res)=> {
    try{
       const {username, password, email, mobile, address}= req.body;
       console.log('imput', req.body);
       console.log("hello");
       const user= await User.findOne({username: username});
       if(!user){
          const user= new User({
            username: username,
            password: password,
            email: email,
            mobile: mobile,
            address: address
          })
          console.log("hello", username);
          await user.save();
          console.log("after", username);
          res.status(201).json({message: 'new user created succesfully'});
       }else{
        res.status(409).json({message: 'User already exists'});
       }
       } catch(error: any){
        console.error(error);
        res.status(500).json({message:'Failed to create a new user', error: error.message})
     }
})
userRouter.post('/users/getCredentials', async(req:any,res: any)=> {
   const {username, password}= req.body
   try{
       const user=await User.findOne({username: username});
       if (!user) {
           return res.status(404).json({ message: "Username not found. Invalid credentials"});
       }
       if (user.password !== password) {
           return res.status(401).json({ message: "Incorrect password" });
       }
       res.status(200).send(user);
   }catch(error: any){
    //    console.log("Error retrieving the user:", error.message);}
    res.status(500).json({message:'Failed to retrieve credentials', error: error.message})
   }
})

export default userRouter;

