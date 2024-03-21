import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean
    },
    userPoints:{
        type: Number,
        default: 50
    },
    userVouchers:{
        type: Array,
        default: []
    },
});  

const User = mongoose.model("User", userSchema);
export default User;