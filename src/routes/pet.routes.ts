import PetDetails from "../models/userPet";
import express from "express"
import { addPet } from "../Functionalities/RegisterPet";
const petRouter= express.Router();
petRouter.post('/pets/addNewPet', async(req: any,res: any)=> {
    console.log('Request Body:', req.body);
    try{
        const {username, petInfo}= req.body;
        console.log('data',username);
        const result = await addPet(username, petInfo);
        if(result=== "Pet is already registered"){
            return res.status(409).send({message: "Pet is already registered"});
        }
       return res.status(201).send({message: "Pet added succesfully"});
    }catch(error: any){
        return res.status(500).send({message: "Error while adding a new pet"})
    }
})

petRouter.post('/pets/getPetDetails', async(req,res)=> {
    try{
        const {username}= req.body;
        const pets= await PetDetails.findOne({username: username});
        console.log(pets);
        res.status(200).send( {data: pets?.petDetails, message: 'pets data retrieved successfully'});
      }
      catch(error: any){
        res.status(500).send({message: "Error while retrieving the pet details"})
      }
 })
 export default petRouter;