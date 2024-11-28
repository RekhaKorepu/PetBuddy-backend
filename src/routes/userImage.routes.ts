import express from 'express'
const userImageRouter= express.Router();
import PetDetails from '../models/userPet';
import User from '../models/user';
userImageRouter.put('/users/addUserImage', async (req: any, res: any) => {
    const { username, imageUrl} = req.body;
     try {
      console.log("hello");
     const user: any = await User.findOne({ username });
     if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     if (imageUrl){
        user.image= imageUrl;
     }
     await user.save();
    
    return res.status(201).json({ message: 'user image added successfully'});
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add user image', error });
    }
});
userImageRouter.post('/users/getUserDetails', async(req: any, res: any)=> {
   const{username}= req.body;
   try{
    const user: any = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("hii");
     res.status(200).send({data: user});
   }catch(error){
    return res.status(500).json({message: 'Failed to retrieve user details'});
   }
})

export default userImageRouter;