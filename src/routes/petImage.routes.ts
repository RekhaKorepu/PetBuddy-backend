import express from 'express'
const petImageRouter= express.Router();
import PetDetails from '../models/userPet';
petImageRouter.put('/pets/addPetImage', async (req: any, res: any) => {
    const { username, petname, imageUrl} = req.body;
     try {
      console.log("image router", username);
     const user: any = await PetDetails.findOne({ username });
     if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     const pet= user.petDetails.find((item: any)=> item.petName===petname);
    
     if (imageUrl){
       pet.image.push(imageUrl);
       console.log("length", pet.image.length);
     }
     await user.save();
    
    res.status(201).json({ message: 'Pet image added successfully', petImages: pet.image });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add pet image', error });
    }
});
petImageRouter.post('/pets/getPetImages', async(req: any, res: any)=> {
   const{username, petname}= req.body;
   try{
    console.log("before hello");
    const user: any = await PetDetails.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const pet= user.petDetails.find((item: any)=> item.petName===petname);
    console.log("after hello");
 
     res.status(200).send({data: pet.image});
   }catch(error){
    return res.status(500).json({message: 'Failed to retrieve pet images'});
   }
})

export default petImageRouter;