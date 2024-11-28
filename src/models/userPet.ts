import mongoose from "mongoose";
const userPet= new mongoose.Schema({
    username: {
        type: String,
        ref: 'User'
    },
    petDetails: [{
        image: [{
            type: String,
        }],
        petName: {
            type: String,
            required: true
        },
        breed: String,
        emergencyContact: String,
        age: String,
        weight: String,
        height: String,
        color: String,
        gender: String,
        remarks: String
    }],
    reminders: [{
        howOften: String,
        activity: String,
        Date: Date,
        fromTime: String,
        toTime: String,
        activityStatus: Boolean
    }]
})
const PetDetails=mongoose.model("PetDetails",userPet);
export default PetDetails;