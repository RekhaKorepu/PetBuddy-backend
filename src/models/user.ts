import mongoose from "mongoose"
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    blockedSlots: [{
       date: Date,
       fromTime: String,
       toTime: String
    }],
});
const User= mongoose.model("User", userSchema);
export default User;

