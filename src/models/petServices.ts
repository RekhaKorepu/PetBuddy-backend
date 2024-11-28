import mongoose from "mongoose";

const veterinarySchema= new mongoose.Schema({
  image: {type: String, required: true},
  name: { type: String, required: true },
  speciality: { type: String, required: true },  
  rating: { type: Number, min: 0, max: 5, required: true },
  numberOfReviews: { type: Number, default: 0 },
  experience: { type: Number, required: true }, 
  distance: { type: String }, 
  consultationFee: { type: Number, required: true }, 
   timings: {type: String}
});
const groomingSchema= new mongoose.Schema({
   image: {type: String, required: true},
    name: { type: String, required: true },
    services: [{ serviceName: String,
        price:Number,
    }],  
    rating: { type: Number, min: 0, max: 5, required: true },
    numberOfReviews: { type: Number, default: 0 },
    distance: { type: String },  
     timings: {type: String}
  });

const petServicesSchema = new mongoose.Schema({
  Veterinaries: [veterinarySchema],  
  Grooming: [groomingSchema]
});

const PetServices = mongoose.model("PetServices", petServicesSchema);

export default PetServices;
