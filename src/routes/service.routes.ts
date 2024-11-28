import express from "express"
import PetServices from "../models/petServices";

const serviceRoutes= express.Router();
serviceRoutes.post('/petServices/Veterinary', async(req,res)=> {
     try {
        const { name, speciality, rating, numberOfReviews, experience, distance, consultationFee, timings,image } = req.body;
        let petService = await PetServices.findOne();
        if (!petService) {
            petService = new PetServices();
        }
        petService.Veterinaries.push({
            image,
            name,
            speciality,
            rating,
            numberOfReviews,
            experience,
            distance,
            consultationFee,
             timings,
        });
        await petService.save();
        res.status(201).json({ message: 'Veterinarian added successfully', petService });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})
serviceRoutes.post('/petServices/grooming', async(req,res)=> {
    try {
       const { name, services, rating, numberOfReviews, distance, timings, image } = req.body;
       let petService = await PetServices.findOne();
       if (!petService) {
           petService = new PetServices();
       }
       petService.Grooming.push({
           image,
           name,
           services,
           rating,
           numberOfReviews,
           distance,
           timings,
       });
       await petService.save();
       res.status(201).json({ message: 'grooming added successfully', petService });
   } catch (error: any) {
       res.status(500).json({ error: error.message });
   }
})

serviceRoutes.get('/pets/getPetServices', async (req:any, res:any) => {
    try {
      const petService = await PetServices.findOne({}, { Veterinaries: 1,  Grooming: 1 });
        if (!petService) {
            return res.status(404).json({ message: "No Services found" });
        }
        console.log(petService);
        res.status(200).json({ veterinarians: petService.Veterinaries, grooming: petService.Grooming});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
export default serviceRoutes;